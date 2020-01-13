import React, { ReactNode } from 'react'
import { FormatOptions } from 'equation-resolver'

import { context }  from './context'
import { RenderOptions } from './RenderOptions'

export type Props = FormatOptions & RenderOptions & {
    children?: ReactNode,
}

export const EquationOptions = ({ children, ...options }: Props) => (
    <context.Provider value={options}>{children}</context.Provider>
)
