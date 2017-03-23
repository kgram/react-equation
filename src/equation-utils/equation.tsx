import * as React from 'react'
import classes from './style.scss'

import parse from './parse'
import resolve from './resolve'

import EquationTree from './equation-tree'

import Fraction from './fraction'
import Operator from './operator'
import Power from './power'

import specials from './specials'

export default function Equation({children = '', evaluate = false}: {children?: string, evaluate?: boolean}) {
    try {
        let tree = parse(children)

        if (evaluate) {
            try {
                const result = resolve(tree)
                tree = {
                    type: 'equals',
                    a: tree,
                    b: numberToTree(result),
                }
            } catch (err) {
                // Suppress errors
            }
        }

        const { elements, height } = mapTree(tree)

        return <span style={{ height: `${height}em` }} className={classes.equation}>{elements}</span>
    } catch (e) {
        return <span className={classes.equation} />
    }
}

function numberToTree(x: number): EquationTree {
    if (x < 0) {
        return {
            type: 'negative',
            value: {
                type: 'number',
                value: -x,
            },
        }
    } else {
        return {
            type: 'number',
            value: x,
        }
    }
}

function mapTree(tree: EquationTree, skipParentheses = false): IRenderedEquation {
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

interface IRenderedEquation {
    elements: JSX.Element[],
    height: number,
    aboveMiddle: number,
    belowMiddle: number,
}

interface IEquationPart {
    type: any,
    props: any,
    children?: any,
    aboveMiddle: number,
    belowMiddle: number,
}

function pushTree(tree: EquationTree, current: IEquationPart[]) {
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

function pushFunction(name: string, args: EquationTree[], current: IEquationPart[]) {
    if (specials.hasOwnProperty(name)) {
        const mapper = specials[name] as ((args: IRenderedEquation[]) => IEquationPart)
        current.push(mapper(args.map((arg) => mapTree(arg))))
        return
    }

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

function pushOperator(operator: any, a: EquationTree, b: EquationTree, current: IEquationPart[]) {
    switch (operator) {
        case '/': {
            const top = mapTree(a, true)
            const bottom = mapTree(b, true)
            current.push({
                type: Fraction,
                props: { top, bottom },
                aboveMiddle: top.height * 0.9,
                belowMiddle: bottom.height * 0.9,
            })
            break
        }
        case '^': {
            const base = mapTree(a, false)
            const exponent = mapTree(b, true)
            current.push({
                type: Power,
                props: { base, exponent },
                aboveMiddle: base.height / 2 + exponent.height * 0.7 - 0.8,
                belowMiddle: base.height / 2,
            })
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
