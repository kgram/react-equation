import * as React from 'react'
import classes from './style.scss'

export default function Power({ base, exponent, style = {} }: {
    base: { elements: JSX.Element[], height: number },
    exponent: { elements: JSX.Element[], height: number },
    style: React.CSSProperties,
}) {
    style.height = `${base.height + exponent.height * 0.6 - 0.7}em`
    return (
        <span style={style}>
            <span style={{ position: 'relative', top: `${exponent.height * 0.7 - 0.8}em`, height: `${base.height}em` }}>{base.elements}</span>
            <span style={ {height: `${exponent.height}em` }} className={classes.power}>{exponent.elements}</span>
        </span>
    )
}
