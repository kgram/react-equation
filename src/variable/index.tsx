import React from 'react'
import { EquationNodeVariable } from 'equation-parser'

import { RenderingPart } from '../RenderingPart'

const indexOffset = 0.3
const indexFactor = 0.8

const styles = {
    main: {
        display: 'inline-block',
        fontStyle: 'italic',
    },
    index: {
        fontSize: `${indexFactor * 100}%`,
        position: 'relative',
    },
} as const

export default function variable({ name }: EquationNodeVariable): RenderingPart {

    const [main, ...indices] = name.split('_')

    return {
        type: 'span',
        props: {
            style: {
                ...styles.main,
                marginLeft: /^[%‰°'"]/.test(main) ? '-0.2em' : null,
            },
        },
        aboveMiddle: 0.7,
        belowMiddle: 0.7 + indices.length * indexOffset,
        children: <>
            {main}
            {indices.map((indexName, idx) => (
                <span
                    key={idx}
                    style={{
                        ...styles.index,
                        top: `${indexOffset * (idx + 1) / indexFactor}em`,
                    }}
                >{indexName}</span>
            ))}
        </>,
    }
}
