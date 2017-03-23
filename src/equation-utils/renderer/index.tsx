import * as React from 'react'
import classes from '../style.scss'

import { parse } from '../parser'
import { resolve } from '../resolver'

import { EquationTree, Rendering, RenderingPart } from '../types'

import Operator from './operator'

import fraction from './fraction'
import power from './power'

export function render(tree: EquationTree, skipParentheses = false): Rendering {
    let parts
    if (skipParentheses && tree.type === 'block') {
        parts = pushTree(tree.child, [])
    } else {
        parts = pushTree(tree, [])
    }
    const aboveMiddle = parts.reduce((current, part) => Math.max(current, part.aboveMiddle), 0)
    const belowMiddle = parts.reduce((current, part) => Math.max(current, part.belowMiddle), 0)

    for (const part of parts) {
        if (part.aboveMiddle < aboveMiddle) {
            part.props.style = {
                position: 'relative',
                top: `${aboveMiddle - part.aboveMiddle}em`,
            }
        }
    }

    return {
        aboveMiddle,
        belowMiddle,
        height: aboveMiddle + belowMiddle,
        elements: parts.map((part) => React.createElement(part.type, part.props, part.children)),
    }
}

function pushTree(tree: EquationTree, current: RenderingPart[]) {
    switch (tree.type) {
        case 'number':
            current.push(simplePart(tree.value, 'number'))
            break
        case 'variable':
            current.push(simplePart(tree.name, 'variable'))
            break
        case 'negative':
            // Unicode MINUS
            current.push(simplePart('−', 'minus-standalone'))
            pushTree(tree.value, current)
            break
        case 'block':
            current.push(simplePart('(', 'parens'))
            pushTree(tree.child, current)
            current.push(simplePart(')', 'parens'))
            break
        case 'operator':
            pushOperator(tree.operator, tree.a, tree.b, current)
            break
        case 'function':
            pushFunction(tree.name, tree.args, current)
            break
        case 'equals':
            pushTree(tree.a, current)
            current.push(simplePart('=', 'equals'))
            pushTree(tree.b, current)
            break
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation render: cannot resolve type "${type}"`)
    }

    return current
}

function simplePart(value: string | number, cls?: string) {
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

function pushFunction(name: string, args: EquationTree[], current: RenderingPart[]) {
    // if (specials.hasOwnProperty(name)) {
    //     const mapper = specials[name] as ((args: Rendering[]) => RenderingPart)
    //     current.push(mapper(args.map((arg) => render(arg))))
    //     return
    // }

    current.push(simplePart(name, 'funcName'))
    current.push(simplePart('(', 'funcParens'))
    args.forEach((arg, i) => {
        if (i > 0) {
            current.push(simplePart(', '))
        }
        pushTree(arg, current)
    })
    current.push(simplePart(')', 'funcParens'))
}

function pushOperator(operator: any, a: EquationTree, b: EquationTree, current: RenderingPart[]) {
    switch (operator) {
        case '/': {
            current.push(fraction({ a, b }))
            break
        }
        case '^': {
            current.push(power({ a, b }))
            break
        }
        default:
            pushTree(a, current)
            current.push({
                type: Operator,
                props: { type: operator },
                aboveMiddle: 0.7,
                belowMiddle: 0.7,
            })
            pushTree(b, current)
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
