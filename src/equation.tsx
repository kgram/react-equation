import * as React from 'react'
import classes from './style.scss'

import { parse } from './parser'
import { resolveTree } from './resolver'
import { VariableLookup, FunctionLookup } from './types'

import { render } from './renderer'

type Props = {
    children?: string | string [],
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
    style?: React.CSSProperties,
}

export default function Equation({children = '', evaluate = false, variables, functions, style = {}}: Props) {
    try {
        if (children instanceof Array) {
            children = children.join('')
        }
        let tree = parse(children)

        if (evaluate) {
            try {
                const result = resolveTree(tree, variables, functions)
                tree = {
                    type: 'comparison',
                    comparison: '=',
                    a: tree,
                    b: result,
                }
            } catch (err) {
                // Suppress errors
            }
        }

        const { elements, height } = render(tree)

        style.height = `${height}em`

        return <span style={style} className={classes.equation}>{elements}</span>
    } catch (err) {
        return <span className={classes.equation} />
    }
}
