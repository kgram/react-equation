import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeOperator } from '../../types'

import classes from './styles.scss'

import render from '../render'

const fontFactor = 0.9
const separatorSize = 0.06

export default function fraction({ a, b }: EquationTreeOperator): RenderingPart {
    const top = render(a, true)
    const bottom = render(b, true)
    return {
        type: Fraction,
        props: { top, bottom },
        aboveMiddle: top.height * fontFactor - separatorSize / 2,
        belowMiddle: bottom.height * fontFactor + separatorSize * 3 / 2,
    }
}

function Fraction({top, bottom, style}: {
    top: Rendering,
    bottom: Rendering,
    style: React.CSSProperties,
}) {
    return (
        <span style={style} className={classes.wrapper}>
            <span style={{ height: `${top.height}em` }} className={classes.top}>{top.elements}</span>
            <span className={classes.separator} />
            <span style={{ height: `${bottom.height}em` }} className={classes.bottom}>{bottom.elements}</span>
        </span>
    )
}
