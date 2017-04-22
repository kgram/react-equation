import * as React from 'react'
import classes from '../style.scss'

import throwUnknownType from '../throw-unknown-type'

import { EquationTree, EquationTreeOperator, EquationTreeFunction, Rendering, RenderingPart } from '../types'

import Operator from './operator'

import variable from './variable'
import block from './block'
import func from './func'
import fraction from './fraction'
import power from './power'
import matrix from './matrix'

import sum from './sum'
import abs from './abs'
import sqrt from './sqrt'
import root from './root'

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
        if (part.aboveMiddle < aboveMiddle) {
            part.props.style = {
                top: `${aboveMiddle - part.aboveMiddle}em`,
            }
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
            current.push(simplePart(tree.value, 'number'))
            break
        case 'infinity':
            current.push(simplePart('∞', 'number'))
            break
        case 'variable':
            current.push(variable(tree))
            break
        case 'negative':
            // Unicode MINUS
            current.push(simplePart('−', 'minus-standalone'))
            pushTree(tree.value, current)
            break
        case 'plusminus':
            current.push(simplePart('±', 'plusminus-standalone'))
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
        case 'equals':
            pushTree(tree.a, current)
            current.push(simplePart('=', 'equals'))
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

export function simplePart(value: string, cls?: string) {
    return {
        type: 'span',
        props: { className: cls && classes[cls] },
        children: value,
        aboveMiddle: 0.7,
        belowMiddle: 0.7,
    }
}

function pushFunction(tree: EquationTreeFunction, current: RenderingPart[]) {
    switch (tree.name) {
        case 'sum':
            current.push(sum(tree))
            break
        case 'abs':
            current.push(abs(tree))
            break
        case 'sqrt':
            current.push(sqrt(tree))
            break
        case 'root':
            current.push(root(tree))
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
