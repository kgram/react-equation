import React from 'react'
import { EquationNode, EquationNodeFunction, EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

import { Rendering } from '../types/Rendering'
import { RenderingPart } from '../types/RenderingPart'
import { RenderOptions } from '../types/RenderOptions'
import { EquationRenderError } from '../types/EquationRenderError'

import { throwUnknownType } from '../utils/throwUnknownType'
import { getError } from '../errorHandler'

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

import { Wrapper } from './Wrapper'

export const render = (node: EquationNode | EquationParserError | EquationResolveError | EquationRenderError, { errorHandler = {}, className, style }: RenderOptions = {}) => {
    if (node.type === 'parser-error') {
        return (
            <span>
                <Wrapper className={className} style={style}>
                    {node.equation.substring(0, node.start)}
                    <span style={{ color: 'red' }}>{node.equation.substring(node.start, node.end + 1)}</span>
                    {node.equation.substring(node.end + 1)}
                </Wrapper>
                <br />
                {getError(node, errorHandler)}
            </span>
        )
    }
    if (node.type === 'resolve-error') {
        const { elements, height } = renderInternal(node.node, node.errorNode)
        return (
            <span className={className} style={style}>
                <Wrapper height={height}>{elements}</Wrapper>
                <br />
                {getError(node, errorHandler)}
            </span>
        )
    }
    if (node.type === 'render-error') {
        const { elements, height } = renderInternal(node.node, null)
        return (
            <span className={className} style={style}>
                <Wrapper height={height}>{elements}</Wrapper>
                <br />
                {getError(node, errorHandler)}
            </span>
        )
    }

    const { elements, height, aboveMiddle } = renderInternal(node, null)

    return (
        <Wrapper height={height} aboveMiddle={aboveMiddle} className={className} style={style}>
            {elements}
        </Wrapper>
    )
}

export function renderInternal(node: EquationNode, errorNode: EquationNode | null, skipParentheses = false, ...initial: RenderingPart[]): Rendering {
    let parts
    if (skipParentheses && node.type === 'block') {
        parts = pushTree(node.child, initial, errorNode)
    } else {
        parts = pushTree(node, initial, errorNode)
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

export function pushTree(node: EquationNode, current: RenderingPart[], errorNode: EquationNode | null) {
    if (node === errorNode) {
        console.log('error on', node, errorNode)
        const { aboveMiddle, belowMiddle, elements } = renderInternal(node, null, false)

        current.push({
            aboveMiddle,
            belowMiddle,
            type: 'span',
            props: { style: { color: 'red' } },
            children: elements,
        })

        return current
    }
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
            pushTree(node.value, current, errorNode)
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
            pushTree(node.a, current, errorNode)
            current.push(simplePart(symbol, style))
            pushTree(node.b, current, errorNode)
            break
        }

        case 'divide-fraction':
            current.push(fraction(node, errorNode))
            break
        case 'power':
            current.push(power(node, errorNode))
            break

        case 'block':
            current.push(block(node, errorNode))
            break
        case 'function':
            pushFunction(node, current, errorNode)
            break
        case 'function-placeholder':
            current.push(func(node, errorNode))
            break

        case 'matrix':
            current.push(matrix(node, errorNode))
            break
        default:
            throwUnknownType(node, (type) => `Equation render: cannot resolve type "${type}"`)
    }

    return current
}

export function simplePart(value: string, style?: React.CSSProperties): RenderingPart {
    return {
        type: 'span',
        props: { style },
        children: value,
        aboveMiddle: 0.7,
        belowMiddle: 0.7,
    }
}

function pushFunction(tree: EquationNodeFunction, current: RenderingPart[], errorNode: EquationNode | null) {
    switch (tree.name) {
        case 'sum':
            current.push(specialSum(tree, errorNode))
            break
        case 'abs':
            current.push(specialAbs(tree, errorNode))
            break
        case 'sqrt':
            current.push(specialSqrt(tree, errorNode))
            break
        case 'root':
            current.push(specialRoot(tree, errorNode))
            break
        default:
            current.push(func(tree, errorNode))
            break
    }
}
