import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeFunction } from '../types'

import { render } from '.'

import { Sqrt } from './sqrt'

const padding = 0.1
const rootIndexFactor = 0.7
const rootIndexOffset = 1

export default function root({args: [rootIndex, expression]}: EquationTreeFunction): RenderingPart {
    const content = render(expression)
    const rootIndexContent = render(rootIndex)

    const rootIndexHeight = (rootIndexContent.height + rootIndexOffset) * rootIndexFactor

    return {
        type: Root,
        props: { content, rootIndex: rootIndexContent },
        aboveMiddle: content.aboveMiddle + Math.max(0, rootIndexHeight - content.height - padding),
        belowMiddle: content.belowMiddle,
        children: content.elements,
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
    }
    const sqrtStyle = {
        top: `${Math.max(indexHeight * rootIndexFactor - contentHeight, 0)}em`,
        // Move index closer to radical line
        // Experimentally determined factor
        marginLeft: `${Math.atan(contentHeight) * 0.6 - 1}em`,
    }
    return (
        <span style={style} className={classes.functionRoot}>
            <span style={rootIndexStyle} className={classes.functionRootIndex}>{rootIndex.elements}</span>
            <Sqrt style={sqrtStyle} content={content} />
        </span>

    )
}
