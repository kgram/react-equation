import * as React from 'react'
import classes from '../style.scss'

interface IRenderedEquation {
    elements: JSX.Element[],
    height: number,
    aboveMiddle: number,
    belowMiddle: number,
}

interface IEquationPart {
    type: any,
    props: any,
    children?: any,
    aboveMiddle: number,
    belowMiddle: number,
}

export default function abs([{ elements, aboveMiddle, belowMiddle}]: IRenderedEquation[]) {
    return {
        type: Abs,
        props: { },
        children: elements,
        aboveMiddle,
        belowMiddle,
    }
}

function Abs({ children }: { children?: JSX.Element[] }) {
    return <span className={classes.functionAbs}>{children}</span>
}
