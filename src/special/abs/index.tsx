import React from 'react'
import { EquationNode, EquationNodeFunction } from 'equation-parser'

import { RenderingPart } from '../../RenderingPart'

import { renderInternal } from '../../render'

const styles = {
    wrapper: {
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '0 0.3em',
    },
    line: {
        position: 'absolute',
        borderLeft: '0.08em solid currentColor',
        top: '0.2em',
        height: `calc(100% - 0.4em)`,
    },
} as const

export default function abs({args: [expression]}: EquationNodeFunction, errorNode: EquationNode | null): RenderingPart {
    const content = renderInternal(expression || { type: 'operand-placeholder' }, errorNode)

    return {
        type: 'span',
        props: { style: { ...styles.wrapper, height: `${content.height}em` } },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
        children: <>
            <span style={{ ...styles.line, left: '0.1em' }} />
            {content.elements}
            <span style={{ ...styles.line, right: '0.1em' }} />
        </>,
    }
}
