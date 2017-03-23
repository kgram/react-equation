import * as React from 'react'
import classes from './style.scss'

import { parse } from './parser'
import { resolveTree } from './resolver'

import { EquationTree } from './types'

import { render } from './renderer'

export default function Equation({children = '', evaluate = false}: {children?: string, evaluate?: boolean}) {
    try {
        let tree = parse(children)

        if (evaluate) {
            try {
                const result = resolveTree(tree)
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
