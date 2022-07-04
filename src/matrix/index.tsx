import React from 'react'
import { EquationNode, EquationNodeMatrix } from 'equation-parser'

import { RenderingPart } from '../RenderingPart'

import { renderInternal } from '../render'

import Parens from '../parens'

const padding = 0.2
const cellPadding = 0.4
const fontFactor = 0.9

const styles = {
    wrapper: {
        padding: '0.1em 0',
    },
    table: {
        display: 'inline-table',
        verticalAlign: 'top',
        borderCollapse: 'collapse',
        fontSize: `${fontFactor * 100}%`,
        marginTop: '0.1em',
    },
    cell: {
        padding: '0.2em 0.5em',
        textAlign: 'center',
        verticalAlign: 'top',
    },
    cellContent: {
        width: '100%',
        height: '100%',
    },
} as const

export default function matrix({ values, m }: EquationNodeMatrix, errorNode: EquationNode | null): RenderingPart {
    const content = values.map((row) => row.map((value) => renderInternal(value, errorNode)))

    const cellHeight = sumOf(content, (row) => maxOf(row, ({height}) => height))

    const height = fontFactor * (m * cellPadding + cellHeight)

    return {
        type: 'span',
        props: { style: styles.wrapper },
        aboveMiddle: (height + padding) / 2,
        belowMiddle: (height + padding) / 2,
        children: <>
            <Parens height={height} type='[]' />
            <table style={styles.table}>
                <tbody>
                    {content.map((row, rowIdx) => {
                        const rowHeight = maxOf(row, (cell) => cell.height) + cellPadding
                        const aboveMiddle = maxOf(row, (cell) => cell.aboveMiddle)
                        return (
                            <tr key={rowIdx} style={{ height: `${rowHeight}em` }}>
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} style={styles.cell}>
                                        <div style={{ position: 'relative', top: `${aboveMiddle - cell.aboveMiddle}em` }}>{cell.elements}</div>
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Parens height={height} type='[]' flip />
        </>,
    }
}

function maxOf<T>(array: T[], get: (value: T) => number): number {
    return array.reduce((current, value) => Math.max(current, get(value)), 0)
}

function sumOf<T>(array: T[], get: (value: T) => number): number {
    return array.reduce((current, value) => current + get(value), 0)
}
