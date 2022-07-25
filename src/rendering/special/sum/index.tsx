import React from 'react'
import { EquationNode, EquationNodeFunction } from 'equation-parser'

import { renderInternal } from '../..'

const iconSize = 1.8
const fontFactor = 0.8

const styles = {
    wrapper: {
        display: 'inline-block',
    },

    block: {
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center' as const,
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

export default function sum({args: [variable, start, end, expression]}: EquationNodeFunction, errorNode: EquationNode | null) {
    const top = renderInternal(end || { type: 'operand-placeholder' }, errorNode)
    const bottom = renderInternal({
        type: 'equals',
        a: variable || { type: 'operand-placeholder' },
        b: start || { type: 'operand-placeholder' },
    }, errorNode)
    const rendering = renderInternal(wrapParenthesis(expression || { type: 'operand-placeholder' }), errorNode, false, {
        type: 'span',
        props: { style: styles.block },
        aboveMiddle: iconSize / 2 + top.height * fontFactor,
        belowMiddle: iconSize / 2 + bottom.height * fontFactor,
        children: <>
            <span style={{ height: `${top.height}em`, ...styles.small }}>{top.elements}</span>
            <span style={styles.icon}>Σ</span>
            <span style={{ height: `${bottom.height}em`, ...styles.small }}>{bottom.elements}</span>
        </>,
    })
    return {
        type: 'span',
        props: { style: styles.wrapper },
        aboveMiddle: rendering.aboveMiddle,
        belowMiddle: rendering.belowMiddle,
        children: rendering.elements,
    }
}

function wrapParenthesis(tree: EquationNode): EquationNode {
    if (canStandAlone(tree)) {
        return tree
    } else {
        return {
            type: 'block',
            child: tree,
        }
    }
}

function canStandAlone(tree: EquationNode): boolean {
    return tree.type === 'variable' ||
        tree.type === 'number' ||
        tree.type === 'block' ||
        tree.type === 'function' ||
        tree.type === 'matrix' ||
        tree.type === 'divide-fraction' ||
        tree.type === 'power' ||
        tree.type === 'operand-placeholder' ||
        tree.type === 'function-placeholder' ||
        ((
            tree.type === 'negative' ||
            tree.type === 'positive' ||
            tree.type === 'positive-negative' ||
            tree.type === 'operator-unary-placeholder'
        ) && canStandAlone(tree.value))
}
