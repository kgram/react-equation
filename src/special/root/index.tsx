import React from 'react'
import { EquationNodeFunction } from 'equation-parser'

import { RenderingPart } from '../../RenderingPart'

import { renderInternal, toRendering } from '../../render'

import sqrt from '../sqrt'

const rootIndexFactor = 0.7
const rootIndexOffset = 0.8

const styles = {
    wrapper: {
        display: 'inline-block',
        position: 'relative',
    },
    indexOuter: {
        display: 'inline-block',
    },
    indexInner: {
        fontSize: `${rootIndexFactor * 100}%`,
        verticalAlign: 'top',
    },
} as const

export default function root({args: [rootIndex, expression]}: EquationNodeFunction): RenderingPart {
    const rootIndexContent = renderInternal(rootIndex || { type: 'operand-placeholder' })
    // Pretend this is a sqrt to avoid repeat of logic
    const sqrtContent = sqrt({ type: 'function', name: 'sqrt', args: [expression] })
    const bottom = sqrtContent.belowMiddle - rootIndexOffset
    const offset = 1 - Math.atan(sqrtContent.aboveMiddle + sqrtContent.belowMiddle) * 0.6
    const rendering = toRendering([
        {
            type: 'span',
            props: {
                style: {
                    ...styles.indexOuter,
                    height: `${rootIndexContent.height * rootIndexFactor}em`,
                    marginRight: `${-offset}em`,
                    minWidth: `${offset}em`,
                },
            },
            aboveMiddle: rootIndexContent.height * rootIndexFactor - bottom,
            belowMiddle: bottom,
            children: (
                <span style={styles.indexInner}>{rootIndexContent.elements}</span>
            ),
        },
        sqrtContent,
    ])

    return {
        type: 'span',
        props: { style: styles.wrapper },
        aboveMiddle: rendering.aboveMiddle,
        belowMiddle: rendering.belowMiddle,
        children: rendering.elements,
    }
}
