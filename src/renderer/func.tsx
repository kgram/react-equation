import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeFunction } from '../types'

import { toRendering, pushTree, simplePart } from './render'

import Parens from './parens'

export default function func({ name, args }: EquationTreeFunction): RenderingPart {
    // Use manual rendering to allow commas to be pushed between args
    // without having to resort to manual alignment
    const argParts: RenderingPart[] = []
    args.forEach((arg, i) => {
        if (i > 0) {
            argParts.push(simplePart(',', 'functionComma'))
        }
        pushTree(arg, argParts)
    })

    const argRendering = toRendering(argParts)

    return {
        type: Func,
        props: { name, args: argRendering },
        aboveMiddle: argRendering.aboveMiddle,
        belowMiddle: argRendering.belowMiddle,
    }
}

export function Func({ name, args, style = {} }: { name: string, args: Rendering, style: React.CSSProperties }) {
    style.height = `${args.height}em`
    return (
        <span style={style} className={classes.block}>
            <span className={classes.funcName} style={{ top: `${args.aboveMiddle - 0.7}em` }}>{name}</span>
            <Parens className={classes.parens} height={args.height} />
            {args.elements}
            <Parens className={classes.parens} height={args.height} flip />
        </span>
    )
}