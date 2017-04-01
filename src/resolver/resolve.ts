import { EquationTree, ResultTree, ResultTreeNumber, VariableLookup, FunctionLookup } from '../types'
import operators from './operators'
import negate from './negate'
import defaultVariables from './default-variables'
import defaultFunctions from './default-functions'

export default function resolve(
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
        case 'matrix':
            const values = tree.values.map((row) => row.map((cell) => resolve(cell, variables, functions)))

            if (!values.every((row) => row.every((cell) => cell.type === 'number'))) {
                throw new Error(`Equation resolve: Cannot resolve nested matrices`)
            }

            return {
                type: 'matrix',
                m: tree.m,
                n: tree.n,
                values: values as ResultTreeNumber[][],
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
