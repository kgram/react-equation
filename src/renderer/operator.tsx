import * as React from 'react'

import classes from '../style.scss'

export default function Operator({ type, style }: { type: '+' | '-' | '±' | '*' | ' ' | '÷', style: React.CSSProperties }) {
    switch (type) {
        case '+':
            return <span style={style} className={`${classes.operator} ${classes.operatorPlus}`}>+</span>
        case '-':
            // MINUS SIGN
            return <span style={style} className={`${classes.operator} ${classes.operatorMinus}`}>−</span>
        case '±':
            return <span style={style} className={`${classes.operator} ${classes.operatorPlusminus}`}>±</span>
        case '*':
            // DOT OPERATOR
            return <span style={style} className={`${classes.operator} ${classes.operatorMultiDot}`}>⋅</span>
        case '÷':
            // DIVISION SIGN
            return <span style={style} className={`${classes.operator} ${classes.operatorDivision}`}>÷</span>
        case ' ':
            return <span style={style} className={`${classes.operator} ${classes.operatorMultiImplied}`} />
        // case '_':
        //     return <span className={`${classes.operator} ${classes.operatorPlaceholder}`} />
        default:
            throw new Error('Unknown operator')
    }
}
