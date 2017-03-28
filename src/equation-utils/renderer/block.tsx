import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeBlock } from '../types'

import render from './render'

import Parens from './parens'

export default function block({ child }: EquationTreeBlock): RenderingPart {
    const content = render(child)

    return {
        type: Block,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
    }
}

export function Block({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    style.height = `${content.height}em`
    return (
        <span style={style} className={classes.block}>
            <Parens className={classes.parens} height={content.height} />
            {content.elements}
            <Parens className={classes.parens} height={content.height} flip />
        </span>
    )
}