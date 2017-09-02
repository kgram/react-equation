import * as React from 'react'
import classes from './styles.scss'

import { Rendering, RenderingPart, EquationTreeMatrix } from '../../types'

import render from '../render'

import Parens from '../parens'

const padding = 0.2
const cellPadding = 0.4
const factor = 0.9

export default function matrix({ values, n, m }: EquationTreeMatrix): RenderingPart {
    const content = values.map((row) => row.map((value) => render(value)))

    const cellHeight = sumOf(content, (row) => maxOf(row, ({height}) => height))

    const height = factor * (m * cellPadding + cellHeight)

    return {
        type: Matrix,
        props: { content, height },
        aboveMiddle: (height + padding) / 2,
        belowMiddle: (height + padding) / 2,
    }
}

export function Matrix({ content, height, style = {} }: { content: Rendering[][], height: number, style: React.CSSProperties }) {
    return (
        <span style={style} className={classes.wrapper}>
            <Parens height={height} type='[]' />
            <table className={classes.table}>
                <tbody>
                    {content.map((row, rowIdx) => {
                        const rowHeight = maxOf(row, (cell) => cell.height) + cellPadding
                        const aboveMiddle = maxOf(row, (cell) => cell.aboveMiddle)
                        return (
                            <tr key={rowIdx} style={{ height: `${rowHeight}em` }}>
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className={classes.cell} style={{ top: `${aboveMiddle - cell.aboveMiddle}em` }}>
                                        {cell.elements}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Parens height={height} type='[]' flip />
        </span>
    )
}

function maxOf<T>(array: T[], get: (value: T) => number): number {
    return array.reduce((current, value) => Math.max(current, get(value)), 0)
}

function sumOf<T>(array: T[], get: (value: T) => number): number {
    return array.reduce((current, value) => current + get(value), 0)
}
