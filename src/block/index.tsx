import React from 'react'
import { EquationNodeBlock } from 'equation-parser'

import { Rendering } from '../Rendering'
import { RenderingPart } from '../RenderingPart'

import { render } from '../render'

import Parens from '../parens'

export default function block({ child }: EquationNodeBlock): RenderingPart {
    const content = render(child)

    return {
        type: Block,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
    }
}

export function Block({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    style.height = `${content.height}em`
    return (
        <span style={style}>
            <Parens height={content.height} />
            {content.elements}
            <Parens height={content.height} flip />
        </span>
    )
}
