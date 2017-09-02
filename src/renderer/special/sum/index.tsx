import * as React from 'react'

import { Rendering, EquationTree, EquationTreeFunction } from '../../../types'

import render from '../../render'

const iconSize = 1.8
const fontFactor = 0.8

const styles = {
    wrapper: {
        display: 'inline-block',
    },
    
    block: {
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center',
    },
    
    icon: {
        display: 'block',
        lineHeight: 0.8,
        fontSize: '2.25em',
        padding: '0 0.1em',
        top: '1px',
    },
    
    small: {
        display: 'block',
        fontSize: `${fontFactor * 100}%`,
    },
}

export default function sum({args: [variable, start, end, expression]}: EquationTreeFunction) {
    const top = render(end)
    const bottom = render({
        type: 'comparison',
        comparison: '=',
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
        props: { style: styles.wrapper },
        aboveMiddle: rendering.aboveMiddle,
        belowMiddle: rendering.belowMiddle,
        children: rendering.elements,
    }
}

function Sum({ top, bottom, style }: { top: Rendering, bottom: Rendering, style: React.CSSProperties}) {
    return (
        <span style={{ ...styles.block, ...style }}>
            <span style={{ height: `${top.height}em`, ...styles.small }}>{top.elements}</span>
            <span style={styles.icon}>Σ</span>
            <span style={{ height: `${bottom.height}em`, ...styles.small }}>{bottom.elements}</span>
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
