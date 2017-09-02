import * as React from 'react'

export default function Operator({ type, style }: { type: '+' | '-' | '±' | '*' | ' ' | '÷', style: React.CSSProperties }) {
    switch (type) {
        case '+':
            return <span style={{ padding: '0 0.3em', ...style }}>+</span>
        case '-':
            // MINUS SIGN
            return <span style={{ padding: '0 0.3em', ...style }}>−</span>
        case '±':
            return <span style={{ padding: '0 0.3em', ...style }}>±</span>
        case '*':
            // DOT OPERATOR
            return <span style={{ padding: '0 0.15em', ...style }}>⋅</span>
        case '÷':
            // DIVISION SIGN
            return <span style={{ padding: '0 0.3em', ...style }}>÷</span>
        case ' ':
            return <span style={{ padding: '0 0.1em', ...style }} />
        // case '_':
        //     return <span className={`${classes.operator} ${classes.operatorPlaceholder}`} />
        default:
            throw new Error('Unknown operator')
    }
}
