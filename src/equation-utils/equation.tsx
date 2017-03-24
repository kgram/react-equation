import * as React from 'react'
import classes from './style.scss'

import { parse } from './parser'
import { resolveTree, VariableLookup, FunctionLookup } from './resolver'

import { EquationTree } from './types'

import { render } from './renderer'

export default function Equation({children = '', evaluate = false, variables, functions}: {
    children?: string,
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
}) {
    try {
        let tree = parse(children)

        if (evaluate) {
            try {
                const result = resolveTree(tree, variables, functions)
                tree = {
                    type: 'equals',
                    a: tree,
                    b: result,
                }
            } catch (err) {
                // Suppress errors
            }
        }

        const { elements, height } = render(tree)

        return <span style={{ height: `${height}em` }} className={classes.equation}>{elements}</span>
    } catch (e) {
        return <span className={classes.equation} />
    }
}
