import React from 'react'
import { EquationNodeFunction, EquationNode } from 'equation-parser'

import { RenderingPart } from '../../types/RenderingPart'

import { toRendering, pushTree, simplePart, renderInternal } from '..'

import Parens from '../parens'

export default function func(node: EquationNodeFunction | { type: 'function-placeholder', args: EquationNode[], name?: undefined }, errorNode: EquationNode | null): RenderingPart {
    // Use manual rendering to allow commas to be pushed between args
    // without having to resort to manual alignment
    const argParts: RenderingPart[] = []
    node.args.forEach((arg, i) => {
        if (i > 0) {
            argParts.push(simplePart(',', { paddingRight: '0.4em' }))
        }
        pushTree(arg, argParts, errorNode)
    })

    // Render name as variable or placeholder
    const nameRendering = renderInternal(node.type === 'function' ? { type: 'variable', name: node.name } : { type: 'operand-placeholder' }, errorNode)
    const argRendering = toRendering(argParts)

    return {
        type: 'span',
        props: { style: { height: `${Math.max(nameRendering.height, argRendering.height)}em` } },
        aboveMiddle: Math.max(nameRendering.aboveMiddle, argRendering.aboveMiddle),
        belowMiddle: Math.max(nameRendering.belowMiddle, argRendering.belowMiddle),
        children: <>
            <span style={{ position: 'relative', top: `${argRendering.aboveMiddle - nameRendering.aboveMiddle}em` }}>{nameRendering.elements}</span>
            <Parens height={argRendering.height} />
            {argRendering.elements}
            <Parens height={argRendering.height} flip />
        </>,
    }
}
