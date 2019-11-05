import React from 'react'
import { EquationNodePower } from 'equation-parser'

import { Rendering } from '../Rendering'
import { RenderingPart } from '../RenderingPart'

import { render } from '../render'

const fontFactor = 0.7
const exponentOffset = 0.8

const styles = {
    exponent: {
        fontSize: `${fontFactor * 100}%`,
        display: 'inline-block',
        verticalAlign: 'top',
    },
}

export default function power({ a, b }: EquationNodePower): RenderingPart {
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
    return (
        <span style={{ height: `${base.height + baseOffset}em`, ...style}}>
            <span style={{ position: 'relative', top: `${baseOffset}em`, height: `${base.height}em`}}>{base.elements}</span>
            <span style={{ ...styles.exponent, height: `${exponent.height}em` }}>{exponent.elements}</span>
        </span>
    )
}
