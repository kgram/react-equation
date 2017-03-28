import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeOperator } from '../types'

import classes from '../style.scss'

import render from './render'

const fontFactor = 0.7
const exponentOffset = 0.8

export default function power({ a, b }: EquationTreeOperator): RenderingPart {
    const base = render(a, false)
    const exponent = render(b, true)
    const baseOffset = exponent.height * fontFactor - exponentOffset
    return {
        type: Power,
        props: { base, exponent, baseOffset },
        aboveMiddle: base.height / 2 + baseOffset,
        belowMiddle: base.height / 2,
    }
}

function Power({ base, exponent, baseOffset, style = {} }: {
    base: Rendering,
    exponent: Rendering,
    baseOffset: number,
    style: React.CSSProperties,
}) {
    style.height = `${base.height + baseOffset}em`
    const baseStyle = {
        top: `${baseOffset}em`,
        height: `${base.height}em`,
    }
    const exponentStyle = {
        height: `${exponent.height}em`,
    }
    return (
        <span style={style}>
            <span style={baseStyle}>{base.elements}</span>
            <span style={exponentStyle} className={classes.power}>{exponent.elements}</span>
        </span>
    )
}
