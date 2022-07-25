import React from 'react'
import { EquationNode, EquationNodePower } from 'equation-parser'

import { RenderingPart } from '../../types/RenderingPart'

import { renderInternal } from '..'

const fontFactor = 0.7
const exponentOffset = 0.8

const styles = {
    exponent: {
        fontSize: `${fontFactor * 100}%`,
        display: 'inline-block',
        verticalAlign: 'top',
    },
}

export default function power({ a, b }: EquationNodePower, errorNode: EquationNode | null): RenderingPart {
    const base = renderInternal(a, errorNode, false)
    const exponent = renderInternal(b, errorNode, true)
    const baseOffset = exponent.height * fontFactor - exponentOffset
    return {
        type: 'span',
        props: { style: { height: `${base.height + baseOffset}em` } },
        aboveMiddle: base.height / 2 + baseOffset,
        belowMiddle: base.height / 2,
        children: <>
            <span style={{ position: 'relative', top: `${baseOffset}em`, height: `${base.height}em`}}>{base.elements}</span>
            <span style={{ ...styles.exponent, height: `${exponent.height}em` }}>{exponent.elements}</span>
        </>,
    }
}
