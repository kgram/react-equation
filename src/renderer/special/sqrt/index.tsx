import * as React from 'react'

import { Rendering, RenderingPart, EquationTreeFunction } from '../../../types'

import render from '../../render'

import RootSymbol from './root-symbol'

const padding = 0.1

const styles = {
    wrapper: {
        display: 'inline-block',
        paddingTop: '0.1em',
    },
    
    symbol: {
        verticalAlign: 'top',
    },
    
    line: {
        position: 'absolute',
        width: 'calc(100% - 0.7em)',
        borderTop: '0.08em solid currentColor',
        top: `${padding}em`,
        left: '0.8em',
    },
    
}

export default function sqrt({args: [expression]}: EquationTreeFunction): RenderingPart {
    const content = render(expression)

    return {
        type: Sqrt,
        props: { content },
        aboveMiddle: content.aboveMiddle,
        belowMiddle: content.belowMiddle,
    }
}

export function Sqrt({ content, style = {} }: { content: Rendering, style: React.CSSProperties }) {
    return (
        <span style={{ ...styles.wrapper, position: 'relative', height: `${content.height + padding}em`, ...style}}>
            <RootSymbol style={styles.symbol} height={content.height + padding} />
            <div style={{ ...styles.line, position: 'absolute' }}/>
            {content.elements}
        </span>
    )
}
