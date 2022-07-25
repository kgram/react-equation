import { ReactNode } from 'react'
import { EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'
import { EquationRenderError } from './EquationRenderError'

export type CombinedError = EquationParserError | EquationResolveError | EquationRenderError

export type ErrorHandler = {
    [Key in CombinedError['errorType']]?: (node: Extract<CombinedError, { errorType: Key} >) => ReactNode
}
