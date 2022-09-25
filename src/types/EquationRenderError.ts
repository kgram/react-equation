import { EquationNode } from 'equation-parser'
import { ReactNode } from 'react'

/** Errors that occur specifically during rendering */
export type EquationRenderError = { type: 'render-error', node: EquationNode } & (
    | { errorType: 'variableResolution', name: string, errorMessage: ReactNode }
    | { errorType: 'variableNaming', name: String }
    | { errorType: 'functionSignature', signature: String }
)
