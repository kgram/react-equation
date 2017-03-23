import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeOperator } from '../types'

import classes from '../style.scss'

import { render } from '.'

export default function power({ a, b }: EquationTreeOperator): RenderingPart {
    const base = render(a, false)
    const exponent = render(b, true)
    return {
        type: Power,
        props: { base, exponent },
        aboveMiddle: base.height / 2 + exponent.height * 0.7 - 0.8,
        belowMiddle: base.height / 2,
    }
}

function Power({ base, exponent, style = {} }: {
    base: Rendering,
    exponent: Rendering,
    style: React.CSSProperties,
}) {
    style.height = `${base.height + exponent.height * 0.6 - 0.7}em`
    return (
        <span style={style}>
            <span style={{ position: 'relative', top: `${exponent.height * 0.7 - 0.8}em`, height: `${base.height}em` }}>{base.elements}</span>
            <span style={ {height: `${exponent.height}em` }} className={classes.power}>{exponent.elements}</span>
        </span>
    )
}
