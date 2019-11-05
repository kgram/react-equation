import React from 'react'

import { parse } from 'equation-parser'
import { format } from 'equation-resolver'

import { render }  from './render'

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
                tree = format(tree, unitTree, { variables, functions })
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
