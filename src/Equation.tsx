import React from 'react'

import { parse } from 'equation-parser'

import { render }  from './render'

export type Props = {
    value: string,
    style?: React.CSSProperties,
    className?: string,
}

export default function Equation({ value }: Props) {
    return render(parse(value))
}
