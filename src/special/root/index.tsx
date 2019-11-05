import React from 'react'
import { EquationNodeFunction } from 'equation-parser'

import { Rendering } from '../../Rendering'
import { RenderingPart } from '../../RenderingPart'

import { render } from '../../render'

import { Sqrt } from '../sqrt'

const padding = 0.1
const rootIndexFactor = 0.7
const rootIndexOffset = 1

export default function root({args: [rootIndex, expression]}: EquationNodeFunction): RenderingPart {
    const content = render(expression)
    const rootIndexContent = render(rootIndex)

    const rootIndexHeight = (rootIndexContent.height + rootIndexOffset) * rootIndexFactor

    return {
        type: Root,
        props: { content, rootIndex: rootIndexContent },
        aboveMiddle: content.aboveMiddle + Math.max(0, rootIndexHeight - content.height - padding),
        belowMiddle: content.belowMiddle,
    }
}

function Root({ content, rootIndex, style = {} }: { content: Rendering, rootIndex: Rendering, style: React.CSSProperties }) {
    const contentHeight = content.height + padding
    const indexHeight = rootIndex.height + rootIndexOffset
    style.height = `${Math.max(contentHeight, indexHeight * rootIndexFactor)}em`
    const rootIndexStyle = {
        // Rescale to root index font-size
        top: `${Math.max(contentHeight / rootIndexFactor - indexHeight, 0)}em`,
        height: rootIndex.height,
        fontSize: `${rootIndexFactor * 100}%`,
        display: 'inline-block',
        verticalAlign: 'top',
    }
    const sqrtStyle = {
        top: `${Math.max(indexHeight * rootIndexFactor - contentHeight, 0)}em`,
        // Move index closer to radical line
        // Experimentally determined factor
        marginLeft: `${Math.atan(contentHeight) * 0.6 - 1}em`,
    }
    return (
        <span style={{ display: 'inline-block', ...style}} >
            <span style={{ ...rootIndexStyle, position: 'relative' }}>{rootIndex.elements}</span>
            <Sqrt style={sqrtStyle} content={content} />
        </span>

    )
}
