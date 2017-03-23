import * as React from 'react'
import classes from '../style.scss'

import SumIcon from './sum.svg'

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

export default function sum([variable, start, end, expression]: IRenderedEquation[]) {
    return {
        type: Sum,
        props: { variable, start, end, expression },
        aboveMiddle: Math.max(0.8 + end.height * 0.8, expression.aboveMiddle),
        belowMiddle: Math.max(0.8 + start.height * 0.8, 0.8 + variable.height * 0.8, expression.belowMiddle),
    }
}

function Sum({ variable, start, end, expression }: { variable: IRenderedEquation, start: IRenderedEquation, end: IRenderedEquation, expression: IRenderedEquation}) {
    return (
        <span className={classes.functionSum}>
            <span className={classes.functionSumBlock}>
                <span className={classes.functionSumTop}>{end.elements}</span>
                <SumIcon className={classes.functionSumIcon} />
                <span className={classes.functionSumBottom}>
                    {variable.elements}<span className={classes.equals}>=</span>{start.elements}
                </span>
            </span>
            <span style={{ position: 'relative', top: `${Math.max(0.8 + end.height * 0.8, expression.aboveMiddle) - expression.aboveMiddle}em` }}>{expression.elements}</span>
        </span>
    )
}
