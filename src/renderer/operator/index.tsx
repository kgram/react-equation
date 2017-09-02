import * as React from 'react'

import classes from './styles.scss'

export default function Operator({ type, style }: { type: '+' | '-' | '±' | '*' | ' ' | '÷', style: React.CSSProperties }) {
    switch (type) {
        case '+':
            return <span style={style} className={classes.plus}>+</span>
        case '-':
            // MINUS SIGN
            return <span style={style} className={classes.minus}>−</span>
        case '±':
            return <span style={style} className={classes.plusminus}>±</span>
        case '*':
            // DOT OPERATOR
            return <span style={style} className={classes.multiDot}>⋅</span>
        case '÷':
            // DIVISION SIGN
            return <span style={style} className={classes.division}>÷</span>
        case ' ':
            return <span style={style} className={classes.multiImplied} />
        // case '_':
        //     return <span className={`${classes.operator} ${classes.operatorPlaceholder}`} />
        default:
            throw new Error('Unknown operator')
    }
}
