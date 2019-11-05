import * as React from 'react'

import { RenderingPart, EquationTreeVariable } from '../../types'

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

    return (
        <span style={{
            display: 'inline-block',
            fontStyle: 'italic',
            marginLeft: /^[%‰°'"]/.test(main) ? '-0.2em' : null,
            ...style,
        }}>
            {main}
            {indices.map((indexName, idx) => (
                <span
                    key={idx}
                    style={{
                        fontSize: `${indexFactor * 100}%`,
                        position: 'relative',
                        top: `${indexOffset * (idx + 1) / indexFactor}em`,
                    }}
                >{indexName}</span>
            ))}
        </span>
    )
}
