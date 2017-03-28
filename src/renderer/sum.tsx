import * as React from 'react'
import classes from '../style.scss'

import { Rendering, EquationTree, EquationTreeFunction } from '../types'

import render from './render'

const iconSize = 1.8
const fontFactor = 0.8

export default function sum({args: [variable, start, end, expression]}: EquationTreeFunction) {
    const top = render(end)
    const bottom = render({
        type: 'equals',
        a: variable,
        b: start,
    })
    const block = {
        type: Sum,
        props: { top, bottom },
        aboveMiddle: iconSize / 2 + top.height * fontFactor,
        belowMiddle: iconSize / 2 + bottom.height * fontFactor,
    }
    const rendering = render(wrapParenthesis(expression), false, block)
    return {
        type: 'span',
        props: { className: classes.functionSum },
        aboveMiddle: rendering.aboveMiddle,
        belowMiddle: rendering.belowMiddle,
        children: rendering.elements,
    }
}

function Sum({ top, bottom, style }: { top: Rendering, bottom: Rendering, style: React.CSSProperties}) {
    return (
        <span style={style} className={classes.functionSumBlock}>
            <span style={{ height: `${top.height}em` }} className={classes.functionSumTop}>{top.elements}</span>
            <span className={classes.functionSumIcon}>Σ</span>
            <span style={{ height: `${bottom.height}em` }} className={classes.functionSumBottom}>{bottom.elements}</span>
        </span>
    )
}

function wrapParenthesis(tree: EquationTree): EquationTree {
    if (canStandAlone(tree)) {
        return tree
    } else {
        return {
            type: 'block',
            child: tree,
        }
    }
}

function canStandAlone(tree: EquationTree): boolean {
    return tree.type === 'variable' ||
        tree.type === 'number' ||
        tree.type === 'block' ||
        tree.type === 'function' ||
        (tree.type === 'operator' && (
            tree.operator === '/' ||
            tree.operator === '^'
        )) ||
        (tree.type === 'negative' && canStandAlone(tree.value))
}
