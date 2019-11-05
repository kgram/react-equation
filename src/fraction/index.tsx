import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeDivideFraction } from '../../types'

import render from '../render'

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
        width: '100%',
        padding: '0 0.4em',
    },

    separator: {
        display: 'block',
        background: 'currentColor',
        width: '100%',
        borderTop: `${separatorSize}em solid currentColor`,
    },
}

export default function fraction({ a, b }: EquationTreeDivideFraction): RenderingPart {
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
        <span style={{ ...styles.wrapper , ...style}}>
            <span style={{ ...styles.part, height: `${top.height}em` }}>{top.elements}</span>
            <span style={styles.separator} />
            <span style={{ ...styles.part, height: `${bottom.height}em` }}>{bottom.elements}</span>
        </span>
    )
}
