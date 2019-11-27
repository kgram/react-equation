import React from 'react'

import { parse } from 'equation-parser'
import { format, VariableLookup, FunctionLookup } from 'equation-resolver'

import { render }  from './render'

export type Props = {
    value: string,
    variables?: VariableLookup,
    functions?: FunctionLookup,
    unit?: string,
    style?: React.CSSProperties,
    className?: string,
}

export default function EquationEvaluate({ value, variables, functions, unit }: Props) {
    const tree = format(parse(value), unit ? parse(unit) : null, { variables, functions })

    return render(tree)
}
