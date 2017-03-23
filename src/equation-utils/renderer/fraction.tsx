import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeOperator } from '../types'

import classes from '../style.scss'

import { render } from '.'

export default function fraction({ a, b }: EquationTreeOperator): RenderingPart {
    const top = render(a, true)
    const bottom = render(b, true)
    return {
        type: Fraction,
        props: { top, bottom },
        aboveMiddle: top.height * 0.9,
        belowMiddle: bottom.height * 0.9,
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
            <span style={{ top: `${top.height}em`}} className={classes.fractionSeparator} />
            <span style={{ height: `${bottom.height}em` }} className={classes.fractionBottom}>{bottom.elements}</span>
        </span>
    )
}
