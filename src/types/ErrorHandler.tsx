import { ReactNode } from 'react'
import { EquationParserError } from 'equation-parser'
import { ResultResolveError } from 'equation-resolver'
import { EquationRenderError } from './EquationRenderError'

export type CombinedError = EquationParserError | ResultResolveError | EquationRenderError

export type ErrorHandler = {
    [Key in CombinedError['errorType']]?: (node: Extract<CombinedError, { errorType: Key} >) => ReactNode
}
