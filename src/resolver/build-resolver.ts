import { EquationTree, VariableLookup, FunctionLookup, ResolverFunction } from '../types'

import checkArgs from './check-args'
import { resolve } from '.'

export default function buildResolver(
    argNames: string[],
    expression: EquationTree,
    expressionVariables: VariableLookup,
    expressionFunctions: FunctionLookup,
): ResolverFunction {
    expressionVariables = { ...expressionVariables }
    expressionFunctions = { ...expressionFunctions }

    return (name, args, argVariables, argFunctions) => {
        checkArgs(name, args, argNames.length, argNames.length)

        argNames.forEach((n, idx) => {
            expressionVariables[n] = resolve(args[idx], argVariables, argFunctions)
        })

        return resolve(expression, expressionVariables, expressionFunctions)
    }
}