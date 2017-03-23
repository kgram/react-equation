import * as React from 'react'

import classes from './style.scss'

export default function Fraction({top, bottom, style}: {
    top: { elements: JSX.Element[], height: number },
    bottom: { elements: JSX.Element[], height: number },
    style: React.CSSProperties,
}) {
    return (
        <span style={style} className={classes.fractionWrapper}>
            <span style={{ height: `${top.height}em` }} className={classes.fractionTop}>{top.elements}</span>
            <span style={{ top: `${top.height}em`}} className={classes.fractionSeparator} />
            <span style={{ height: `${bottom.height}em` }} className={classes.fractionBottom}>{bottom.elements}</span>
        </span>
    )
}
