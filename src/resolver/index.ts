import { EquationTree, ResultTree, VariableLookup, FunctionLookup } from '../types'
import operators from './operators'
import negate from './negate'
import defaultVariables from './default-variables'
import defaultFunctions from './default-functions'

export { default as buildResolver } from './build-resolver'

export function resolveTree(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): EquationTree {
    return resultToEquation(resolve(tree, variables, functions))
}

export function resolve(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): ResultTree {
    switch (tree.type) {
        case 'number':
            return tree
        case 'variable':
            return resolveVariable(tree.name, variables)
        case 'negative':
            return negate(resolve(tree.value, variables, functions))
        case 'plusminus':
            throw new Error('Equation resolve: cannot handle ± operator')
        case 'block':
            return resolve(tree.child, variables, functions)
        case 'operator':
            return operators[tree.operator](
                resolve(tree.a, variables, functions),
                resolve(tree.b, variables, functions),
            )
        case 'function':
            return resolveFunction(
                tree.name,
                tree.args,
                variables,
                functions,
            )
        case 'equals':
            if (tree.a.type === 'variable') {
                return resolve(tree.b)
            } else {
                throw new Error('Equation resolve: equals left-hand side must be a variable')
            }
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation resolve: cannot resolve type "${type}"`)
    }
}

function resolveVariable(name: string, variables: VariableLookup): ResultTree {
    if (variables.hasOwnProperty(name)) {
        return variables[name]
    } else if (defaultVariables.hasOwnProperty(name)) {
        return defaultVariables[name]
    } else {
        throw new Error(`Equation resolve: unknown variable "${name}"`)
    }
}

function resolveFunction(name: string, args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) {
    let func
    if (functions.hasOwnProperty(name)) {
        func = functions[name]
    } else if (defaultFunctions.hasOwnProperty(name)) {
        func = defaultFunctions[name]
    } else {
        throw new Error(`Equation resolve: unknown function "${name}"`)
    }
    return func(name, args, variables, functions)
}

function resultToEquation(result: ResultTree): EquationTree {
    switch (result.type) {
        case 'number':
            if (result.value < 0) {
                return {
                    type: 'negative',
                    value: {
                        type: 'number',
                        value: -result.value,
                    },
                }
            } else {
                return {
                    type: 'number',
                    value: result.value,
                }
            }
    }
}
