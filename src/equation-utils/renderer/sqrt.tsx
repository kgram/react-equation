import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeFunction } from '../types'

import render from './render'

import RootSymbol from './root-symbol'

const padding = 0.1

export default function sqrt({args: [expression]}: EquationTreeFunction): RenderingPart {
    const content = render(expression)

    return {
        type: Sqrt,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
    }
}

export function Sqrt({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    style.height = `${content.height + padding}em`
    return (
        <span style={style} className={classes.functionSqrt}>
            <RootSymbol className={classes.functionSqrtSymbol} height={content.height + padding} />
            <span className={classes.functionSqrtLine} />
            {content.elements}
        </span>
    )
}
