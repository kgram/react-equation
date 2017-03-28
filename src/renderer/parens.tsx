import * as React from 'react'
import classes from '../style.scss'

export default function Parens({ height, className, type = '()', flip = false }: { height: number, className?: string, type?: '()', flip?: boolean }) {
    return (
        <svg width='0.4em' className={`${className} ${flip ? classes.parensFlip : ''}`} viewBox={`0 0 0.4 ${height}`}>
            <path d={pathBuilders[type](height)} />
        </svg>
    )
}

const pathBuilders = {
    '()'(height: number) {
        const offsetHeight = height - 1.4
        return `M0.094 0.681q0 -0.312 0.18 -0.476l0.028 -0.024l0.013 0q0.012 0 0.015 0.003t0.003 0.006q0 0.004 -0.011 0.015q-0.155 0.164 -0.155 0.476l0 ${ offsetHeight }q0 0.321 0.155 0.476q0.011 0.011 0.011 0.015q0 0.009 -0.018 0.009l-0.013 0l-0.028 -0.024q-0.18 -0.164 -0.18 -0.476Z`
    }
}