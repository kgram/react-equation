import React, { ReactNode } from 'react'
import { FormatOptions } from 'equation-resolver'

import { RenderOptions } from '../types/RenderOptions'

import { context }  from './context'

export type Props = FormatOptions & RenderOptions & {
    children?: ReactNode,
}

export const EquationOptions = ({ children, ...options }: Props) => (
    <context.Provider value={options}>{children}</context.Provider>
)
