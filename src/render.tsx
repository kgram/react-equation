import React from 'react'
import { EquationNode, EquationNodeFunction } from 'equation-parser'

import { Rendering } from './Rendering'
import { RenderingPart } from './RenderingPart'

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

export function render(tree: EquationNode, skipParentheses = false, ...initial: RenderingPart[]): Rendering {
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

export function pushTree(node: EquationNode, current: RenderingPart[]) {
    switch (node.type) {
        // Operands
        case 'number':
            current.push(simplePart(node.value))
            break
        case 'variable':
            current.push(variable(node))
            break

        // Unary operators
        case 'positive':
            current.push(simplePart('+', { padding: '0 0.1em' }))
            pushTree(node.value, current)
            break
        case 'negative':
            // Unicode MINUS
            current.push(simplePart('−', { padding: '0 0.1em' }))
            pushTree(node.value, current)
            break
        case 'positive-negative':
            current.push(simplePart('±', { padding: '0 0.1em' }))
            pushTree(node.value, current)
            break

        // Binary operators
        case 'plus':
            pushTree(node.a, current)
            current.push(simplePart('+', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'minus':
            pushTree(node.a, current)
            // Unicode MINUS
            current.push(simplePart('−', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'plus-minus':
            pushTree(node.a, current)
            // Unicode MINUS
            current.push(simplePart('±', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'multiply-implicit':
            pushTree(node.a, current)
            // Unicode DOT OPERATOR
            current.push(simplePart('', { padding: '0 0.1em' }))
            pushTree(node.b, current)
            break
        case 'multiply-dot':
            pushTree(node.a, current)
            // Unicode DOT OPERATOR
            current.push(simplePart('⋅', { padding: '0 0.15em' }))
            pushTree(node.b, current)
            break
        case 'multiply-cross':
            pushTree(node.a, current)
            // Unicode MULTIPLICATION SIGN
            current.push(simplePart('×', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'divide-inline':
            pushTree(node.a, current)
            // Unicode DIVISION SIGN
            current.push(simplePart('÷', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'divide-fraction':
            current.push(fraction(node))
            break
        case 'power':
            current.push(power(node))
            break

        // Comparisons
        case 'equals':
            pushTree(node.a, current)
            current.push(simplePart('=', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'less-than':
            pushTree(node.a, current)
            current.push(simplePart('<', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'less-than-equals':
            pushTree(node.a, current)
            current.push(simplePart('≤', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'greater-than':
            pushTree(node.a, current)
            current.push(simplePart('>', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'greater-than-equals':
            pushTree(node.a, current)
            current.push(simplePart('≥', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break
        case 'approximates':
            pushTree(node.a, current)
            current.push(simplePart('≈', { padding: '0 0.3em' }))
            pushTree(node.b, current)
            break

        case 'block':
            current.push(block(node))
            break
        case 'function':
            pushFunction(node, current)
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
