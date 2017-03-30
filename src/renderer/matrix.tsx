import * as React from 'react'
import classes from '../style.scss'

import { Rendering, RenderingPart, EquationTreeMatrix } from '../types'

import render from './render'

import Parens from './parens'

const padding = 0.2
const cellPadding = 0.4
const factor = 0.9

export default function matrix({ values, n, m }: EquationTreeMatrix): RenderingPart {
    const content = invert(values.map((row) => row.map((value) => render(value))))

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
        <span style={style} className={classes.matrix}>
            <Parens className={classes.parens} height={height} type='[]' />
            <table className={classes.matrixTable}>
                <tbody>
                    {content.map((row) => {
                        const rowHeight = maxOf(row, (cell) => cell.height) + cellPadding
                        const aboveMiddle = maxOf(row, (cell) => cell.aboveMiddle)
                        return (
                            <tr style={{ height: `${rowHeight}em` }}>
                                {row.map((cell) => (
                                    <td style={{ top: `${aboveMiddle - cell.aboveMiddle}em` }}>
                                        {cell.elements}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Parens className={classes.parens} height={height} type='[]' flip />
        </span>
    )
}

function maxOf<T>(array: T[], get?: (value: T) => number): number {
    return array.reduce((current, value) => Math.max(current, (get ? get(value) : value as any)), 0)
}

function sumOf<T>(array: T[], get?: (value: T) => number): number {
    return array.reduce((current, value) => current + (get ? get(value) : value as any), 0)
}

function invert<T>(array: T[][]): T[][] {
    return array[0].map((val1, idx1) => array.map((val2, idx2) => array[idx2][idx1]))
}
