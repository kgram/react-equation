import * as React from 'react'

import throwUnknownType from '../throw-unknown-type'

import { EquationTree, EquationTreeFunction, Rendering, RenderingPart } from './types'

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

export default function render(tree: EquationTree, skipParentheses = false, ...initial: RenderingPart[]): Rendering {
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

export function pushTree(tree: EquationTree, current: RenderingPart[]) {
    switch (tree.type) {
        // Operands
        case 'number':
            current.push(simplePart(tree.value))
            break
        case 'variable':
            current.push(variable(tree))
            break

        // Unary operators
        case 'positive':
            current.push(simplePart('+', { padding: '0 0.1em' }))
            pushTree(tree.value, current)
            break
        case 'negative':
            // Unicode MINUS
            current.push(simplePart('−', { padding: '0 0.1em' }))
            pushTree(tree.value, current)
            break
        case 'positive-negative':
            current.push(simplePart('±', { padding: '0 0.1em' }))
            pushTree(tree.value, current)
            break

        // Binary operators
        case 'plus':
            pushTree(tree.a, current)
            current.push(simplePart('+', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'minus':
            pushTree(tree.a, current)
            // Unicode MINUS
            current.push(simplePart('−', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'plus-minus':
            pushTree(tree.a, current)
            // Unicode MINUS
            current.push(simplePart('±', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'multiply-implicit':
            pushTree(tree.a, current)
            // Unicode DOT OPERATOR
            current.push(simplePart('', { padding: '0 0.1em' }))
            pushTree(tree.b, current)
            break
        case 'multiply-dot':
            pushTree(tree.a, current)
            // Unicode DOT OPERATOR
            current.push(simplePart('⋅', { padding: '0 0.15em' }))
            pushTree(tree.b, current)
            break
        case 'multiply-cross':
            pushTree(tree.a, current)
            // Unicode MULTIPLICATION SIGN
            current.push(simplePart('×', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'divide-inline':
            pushTree(tree.a, current)
            // Unicode DIVISION SIGN
            current.push(simplePart('÷', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'divide-fraction':
            current.push(fraction(tree))
            break
        case 'power':
            current.push(power(tree))
            break

        // Comparisons
        case 'equals':
            pushTree(tree.a, current)
            current.push(simplePart('=', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'less-than':
            pushTree(tree.a, current)
            current.push(simplePart('<', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'less-than-equals':
            pushTree(tree.a, current)
            current.push(simplePart('≤', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'greater-than':
            pushTree(tree.a, current)
            current.push(simplePart('>', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'greater-than-equals':
            pushTree(tree.a, current)
            current.push(simplePart('≥', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break
        case 'approximates':
            pushTree(tree.a, current)
            current.push(simplePart('≈', { padding: '0 0.3em' }))
            pushTree(tree.b, current)
            break

        case 'block':
            current.push(block(tree))
            break
        case 'function':
            pushFunction(tree, current)
            break

        case 'matrix':
            current.push(matrix(tree))
            break
        default:
            throwUnknownType(tree, (type) => `Equation render: cannot resolve type "${type}"`)
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

function pushFunction(tree: EquationTreeFunction, current: RenderingPart[]) {
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
