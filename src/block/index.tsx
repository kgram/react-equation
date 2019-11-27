import React from 'react'
import { EquationNodeBlock } from 'equation-parser'

import { RenderingPart } from '../RenderingPart'

import { renderInternal } from '../render'

import Parens from '../parens'

export default function block({ child }: EquationNodeBlock): RenderingPart {
    const content = renderInternal(child)

    return {
        type: 'span',
        props: { style: { height: `${content.height}em` } },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
        children: <>
            <Parens height={content.height} />
            {content.elements}
            <Parens height={content.height} flip />
        </>,
    }
}
