import * as React from 'react'
import classes from '../style.scss'

import { RenderingPart, EquationTreeVariable } from '../types'

const indexOffset = 0.3
const indexFactor = 0.8

export default function variable({ name }: EquationTreeVariable): RenderingPart {

    const [main, ...indices] = name.split('_')

    return {
        type: Variable,
        props: { main, indices },
        aboveMiddle: 0.7,
        belowMiddle: 0.7 + indices.length * indexOffset,
    }
}

export function Variable({ main, indices, style = {} }: { main: string, indices: string[], style: React.CSSProperties }) {
    style.height = `${1.4 + indices.length * indexOffset}em`

    const classList = [
        classes.variable,
        // Certain variables should be moved closer to the preceding value.
        // This is to avoid the space of implied multiplication
        /^[%‰°'"]/.test(main) ? classes.variableClose : ''
    ]

    return (
        <span style={style} className={classList.join(' ')}>
            {main}
            {indices.map((indexName, idx) => (
                <span
                    key={idx}
                    style={{
                        top: `${indexOffset * (idx + 1) / indexFactor}em`
                    }}
                    className={classes.variableIndex}
                >{indexName}</span>
            ))}
        </span>
    )
}
