import React from 'react'
import { EquationNodeFunction } from 'equation-parser'

import { Rendering } from '../../Rendering'
import { RenderingPart } from '../../RenderingPart'

import { render } from '../../render'

const styles = {
    wrapper: {
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '0 0.3em',
    },
    line: {
        borderLeft: '0.08em solid currentColor',
        top: '0.2em',
        height: `calc(100% - 0.4em)`,
    },
}

export default function abs({args: [expression]}: EquationNodeFunction): RenderingPart {
    const content = render(expression)

    return {
        type: Abs,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
    }
}

function Abs({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    return (
        <span style={{ ...styles.wrapper, height: `${content.height}em`, ...style }}>
            <span style={{ ...styles.line, position: 'absolute', left: '0.1em' }} />
            {content.elements}
            <span style={{ ...styles.line, position: 'absolute', right: '0.1em' }} />
        </span>
    )
}
