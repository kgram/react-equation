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
    },
}

export type Props = {
    value: string,
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
    unit?: string,
    style?: React.CSSProperties,
    className?: string,
}

export default function Equation({value, evaluate = false, variables, functions, unit, style = {}, className}: Props) {
    try {
        let tree = parse(value)
        const unitTree = unit ? parse(unit) : undefined

        if (evaluate) {
            try {
                tree = resolveTree(tree, variables, functions, unitTree)
            } catch (err) {
                console.error(err)
                // Suppress errors
            }
        }

        const { elements, height } = render(tree)

        return <span style={{ ...styles.equation, height: `${height}em`, ...style}} className={className}>{elements}</span>
    } catch (err) {
        console.error(err)
        return <span style={{ ...styles.equation, ...style}} />
    }
}
