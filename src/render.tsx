import React from 'react'
import { EquationNode, EquationNodeFunction, EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

import { Rendering } from './Rendering'
import { RenderingPart } from './RenderingPart'
import { RenderOptions } from './RenderOptions'

import { throwUnknownType } from './throwUnknownType'

import variable from './variable'
import block from './block'
import func from './func'
import fraction from './fraction'
import power from './power'
import matrix from './matrix'

import specialSum from './special/sum'
import specialAbs from './special/abs'
import specialSqrt from './special/sqrt'
import specialRoot from './special/root'

const defaultErrorHandler = (node: EquationParserError | EquationResolveError) => `Error: ${node.errorType}`

export const render = (node: EquationNode | EquationParserError | EquationResolveError, { errorHandler = {}, className, style }: RenderOptions = {}) => {
    const baseProps = {
        className,
        style: {
            ...style,
            display: 'inline-block',
            lineHeight: 1.4,
        },
    }
    if (node.type === 'parser-error') {
        return (
            <span {...baseProps}>
                <div>
                    {node.equation.substring(0, node.start)}
                    <span style={{ color: 'red' }}>{node.equation.substring(node.start, node.end + 1)}</span>
                    {node.equation.substring(node.end + 1)}
                </div>
                <div>
                    {(errorHandler[node.errorType] || defaultErrorHandler)(node as any)}
                </div>
            </span>
        )
    }
    if (node.type === 'resolve-error' && node.node) {
        // TODO: pretty error handling
        const { elements, height } = renderInternal(node.node)
        return (
            <span {...baseProps}>
                <span style={{ height: `${height}em`, display: 'inline-block' }}>{elements}</span>
                <br />
                {(errorHandler[node.errorType] || defaultErrorHandler)(node as any)}
            </span>
        )
    }
    if (node.type === 'resolve-error') {
        return (
            <span {...baseProps}>
                {(errorHandler[node.errorType] || defaultErrorHandler)(node as any)}
            </span>
        )
    }

    const { elements, height } = renderInternal(node)

    return (
        <span {...baseProps} style={{ height: `${height}em`, ...baseProps.style }}>{elements}</span>
    )
}

export function renderInternal(tree: EquationNode, skipParentheses = false, ...initial: RenderingPart[]): Rendering {
    let parts
    if (skipParentheses && tree.type === 'block') {
        parts = pushTree(tree.child, initial)
    } else {
        parts = pushTree(tree, initial)
    }

    return toRendering(parts)
}

export function toRendering(parts: RenderingPart[]): Rendering {
    const aboveMiddle = parts.reduce((current, part) => Math.max(current, part.aboveMiddle), 0)
    const belowMiddle = parts.reduce((current, part) => Math.max(current, part.belowMiddle), 0)

    for (const part of parts) {
        part.props.style = {
            ...part.props.style,
            top: part.aboveMiddle < aboveMiddle ? `${aboveMiddle - part.aboveMiddle}em` : null,
            position: 'relative',
        }
    }

    return {
        aboveMiddle,
        belowMiddle,
        height: aboveMiddle + belowMiddle,
        elements: parts.map((part, idx) => React.createElement(part.type, { key: idx, ...part.props}, part.children)),
    }
}

// Lookups for operator symbols with optional styling
const binaryOperatorLookup = {
    'plus': ['+'],
    // Unicode MINUS
    'minus': ['−'],
    // Unicode MINUS
    'plus-minus': ['±'],
    'multiply-implicit': ['', { padding: '0 0.1em' }],
    // Unicode DOT OPERATOR
    'multiply-dot': ['⋅', { padding: '0 0.15em' }],
    // Unicode MULTIPLICATION SIGN
    'multiply-cross': ['×'],
    // Unicode DIVISION SIGN
    'divide-inline': ['÷'],
    'equals': ['='],
    'less-than': ['<'],
    'less-than-equals': ['≤'],
    'greater-than': ['>'],
    'greater-than-equals': ['≥'],
    'approximates': ['≈'],
    'operator-placeholder': ['?'],
} as const

const unaryOperatorLookup = {
    'positive': ['+'],
    // Unicode MINUS
    'negative': ['−'],
    'positive-negative': ['±'],
    'operator-unary-placeholder': ['?'],
} as const

export function pushTree(node: EquationNode, current: RenderingPart[]) {
    switch (node.type) {
        // Operands
        case 'number':
            current.push(simplePart(node.value))
            break
        case 'variable':
            current.push(variable(node))
            break
        case 'operand-placeholder':
            current.push(simplePart('_'))
            break

        // Unary operators
        case 'positive':
        case 'negative':
        case 'positive-negative':
        case 'operator-unary-placeholder': {
            const [symbol, style = { padding: '0 0.1em' }] = unaryOperatorLookup[node.type]
            current.push(simplePart(symbol, style))
            pushTree(node.value, current)
            break
        }

        case 'plus':
        case 'minus':
        case 'plus-minus':
        case 'multiply-implicit':
        case 'multiply-dot':
        case 'multiply-cross':
        case 'divide-inline':
        case 'equals':
        case 'less-than':
        case 'less-than-equals':
        case 'greater-than':
        case 'greater-than-equals':
        case 'approximates':
        case 'operator-placeholder': {
            const [symbol, style = { padding: '0 0.3em' }] = binaryOperatorLookup[node.type]
            pushTree(node.a, current)
            current.push(simplePart(symbol, style))
            pushTree(node.b, current)
            break
        }

        case 'divide-fraction':
            current.push(fraction(node))
            break
        case 'power':
            current.push(power(node))
            break

        case 'block':
            current.push(block(node))
            break
        case 'function':
            pushFunction(node, current)
            break
        case 'function-placeholder':
            current.push(func(node))
            break

        case 'matrix':
            current.push(matrix(node))
            break
        default:
            throwUnknownType(node, (type) => `Equation render: cannot resolve type "${type}"`)
    }

    return current
}

export function simplePart(value: string, style?: React.CSSProperties) {
    return {
        type: 'span',
        props: { style },
        children: value,
        aboveMiddle: 0.7,
        belowMiddle: 0.7,
    }
}

function pushFunction(tree: EquationNodeFunction, current: RenderingPart[]) {
    switch (tree.name) {
        case 'sum':
            current.push(specialSum(tree))
            break
        case 'abs':
            current.push(specialAbs(tree))
            break
        case 'sqrt':
            current.push(specialSqrt(tree))
            break
        case 'root':
            current.push(specialRoot(tree))
            break
        default:
            current.push(func(tree))
            break
    }
}
