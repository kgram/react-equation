import * as React from 'react'
import classes from './styles.scss'

import { parse } from './parser'
import { resolveTree } from './resolver'
import { VariableLookup, FunctionLookup } from './types'

import { render } from './renderer'

export type Props = {
    children?: string | string [],
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
    unit?: string | string [],
    style?: React.CSSProperties,
}

export default function Equation({children = '', evaluate = false, variables, functions, unit, style = {}}: Props) {
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

        style.height = `${height}em`

        return <span style={style} className={classes.equation}>{elements}</span>
    } catch (err) {
        return <span className={classes.equation} />
    }
}
