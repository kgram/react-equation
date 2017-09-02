import * as React from 'react'

import throwUnknownType from '../throw-unknown-type'

import { EquationTree, EquationTreeOperator, EquationTreeFunction, Rendering, RenderingPart } from '../types'

import Operator from './operator'

import variable from './variable'
import block from './block'
import func from './func'
import fraction from './fraction'
import power from './power'
import matrix from './matrix'
import comparison from './comparison'

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
        case 'number':
            current.push(simplePart(tree.value))
            break
        case 'infinity':
            current.push(simplePart('∞'))
            break
        case 'variable':
            current.push(variable(tree))
            break
        case 'negative':
            // Unicode MINUS
            current.push(simplePart('−', { padding: '0 0.1em' }))
            pushTree(tree.value, current)
            break
        case 'plusminus':
            current.push(simplePart('±', { padding: '0 0.1em' }))
            pushTree(tree.value, current)
            break
        case 'block':
            current.push(block(tree))
            break
        case 'operator':
            pushOperator(tree, current)
            break
        case 'function':
            pushFunction(tree, current)
            break
        case 'comparison':
            pushTree(tree.a, current)
            current.push(comparison(tree))
            pushTree(tree.b, current)
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

function pushOperator(tree: EquationTreeOperator, current: RenderingPart[]) {
    switch (tree.operator) {
        case '/': {
            current.push(fraction(tree))
            break
        }
        case '^': {
            current.push(power(tree))
            break
        }
        default:
            pushTree(tree.a, current)
            current.push({
                type: Operator,
                props: { type: tree.operator },
                aboveMiddle: 0.7,
                belowMiddle: 0.7,
            })
            pushTree(tree.b, current)
    }
}
