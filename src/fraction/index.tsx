import React from 'react'
import { EquationNode, EquationNodeDivideFraction } from 'equation-parser'

import { RenderingPart } from '../RenderingPart'

import { renderInternal } from '../render'

const fontFactor = 0.9
const separatorSize = 0.06

const styles = {
    wrapper: {
        display: 'inline-block',
        verticalAlign: 'top',
    },

    part: {
        fontSize: `${fontFactor * 100}%`,
        display: 'block',
        textAlign: 'center' as const,
        padding: '0 0.4em',
    },

    separator: {
        display: 'block',
        background: 'currentColor',
        borderTop: `${separatorSize}em solid currentColor`,
    },
}

export default function fraction({ a, b }: EquationNodeDivideFraction, errorNode: EquationNode | null): RenderingPart {
    const top = renderInternal(a, errorNode, true)
    const bottom = renderInternal(b, errorNode, true)
    return {
        type: 'span',
        props: { style: { ...styles.wrapper } },
        aboveMiddle: top.height * fontFactor - separatorSize / 2,
        belowMiddle: bottom.height * fontFactor + separatorSize * 3 / 2,
        children: <>
            <span style={{ ...styles.part, height: `${top.height}em` }}>{top.elements}</span>
            <span style={styles.separator} />
            <span style={{ ...styles.part, height: `${bottom.height}em` }}>{bottom.elements}</span>
        </>,
    }
}
