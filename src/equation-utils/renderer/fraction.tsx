import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeOperator } from '../types'

import classes from '../style.scss'

import { render } from '.'

const fontFactor = 0.9
const separatorSize = 0.08

export default function fraction({ a, b }: EquationTreeOperator): RenderingPart {
    const top = render(a, true)
    const bottom = render(b, true)
    return {
        type: Fraction,
        props: { top, bottom },
        aboveMiddle: top.height * fontFactor - separatorSize,
        belowMiddle: bottom.height * fontFactor + separatorSize,
    }
}

function Fraction({top, bottom, style}: {
    top: Rendering,
    bottom: Rendering,
    style: React.CSSProperties,
}) {
    return (
        <span style={style} className={classes.fractionWrapper}>
            <span style={{ height: `${top.height}em` }} className={classes.fractionTop}>{top.elements}</span>
            <span style={{ top: `${top.height - separatorSize * 3 / 4}em`}} className={classes.fractionSeparator} />
            <span style={{ height: `${bottom.height}em` }} className={classes.fractionBottom}>{bottom.elements}</span>
        </span>
    )
}
