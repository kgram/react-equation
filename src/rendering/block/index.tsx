import React from 'react'
import { EquationNode, EquationNodeBlock } from 'equation-parser'

import { RenderingPart } from '../../types/RenderingPart'

import { renderInternal } from '..'

import Parens from '../parens'

export default function block(node: EquationNodeBlock, errorNode: EquationNode | null): RenderingPart {
    const content = renderInternal(node.child, errorNode)

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
