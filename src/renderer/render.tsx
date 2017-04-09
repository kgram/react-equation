import * as React from 'react'
import classes from '../style.scss'

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
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation render: cannot resolve type "${type}"`)
    }

    return current
}

export function simplePart(value: string | number, cls?: string) {
    if (typeof value === 'number') {
        value = formatNumber(value, 3)
    }
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

function formatNumber(x: number, digits: number, commaSep = '.', thousandSep = '') {
    if (x === Infinity) {
        return '∞'
    }

    const value = ensurePrecision(x, digits)

    const parts = value.toString().split('.')

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep)

    return parts
        .join(commaSep)
}

// number.toPrecision with trailing zeros stripped
// Avoids scientific notation for large numbers
function ensurePrecision(x: number, digits: number) {
    // Handle cases where scientific notation would be used
    if (Math.log(Math.abs(x)) * Math.LOG10E >= digits) {
        return Math.round(x).toString()
    }
    // Strip trailing zeroes
    return Number(x.toPrecision(digits)).toString()
}
