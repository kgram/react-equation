import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeFunction } from '../types'

import { render } from '.'

import RootSymbol from './root-symbol'

export default function abs({args: [expression]}: EquationTreeFunction): RenderingPart {
    const content = render(expression)

    return {
        type: Sqrt,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
        children: content.elements,
    }
}

function Sqrt({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    style.height = `${content.height}em`
    return (
        <span style={style} className={classes.functionSqrt}>
            <RootSymbol height={content.height} />
            <span className={classes.functionSqrtLine} />
            <span className={classes.functionSqrtContent}>{content.elements}</span>
        </span>
    )
}
