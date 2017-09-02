import * as React from 'react'

import { parse } from './parser'
import { resolveTree } from './resolver'
import { VariableLookup, FunctionLookup } from './types'

import { render } from './renderer'

const styles= {
    equation: {
        display: 'inline-block',
        lineHeight: 1.4,
        fontFamily: 'MathJax, Times New Roman, serif',
    }
}

export type Props = {
    children?: string | string [],
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
    unit?: string | string [],
    style?: React.CSSProperties,
    className?: string,
}

export default function Equation({children = '', evaluate = false, variables, functions, unit, style = {}, className}: Props) {
    try {
        if (children instanceof Array) {
            children = children.join('')
        }
        if (unit && unit instanceof Array) {
            unit = unit.join('')
        }

        let tree = parse(children)
        let unitTree = unit ? parse(unit) : undefined

        if (evaluate) {
            try {
                tree = resolveTree(tree, variables, functions, unitTree)
            } catch (err) {
                // Suppress errors
            }
        }

        const { elements, height } = render(tree)

        return <span style={{ ...styles.equation, height: `${height}em`, ...style}} className={className}>{elements}</span>
    } catch (err) {
        return <span style={{ ...styles.equation, ...style}} />
    }
}
