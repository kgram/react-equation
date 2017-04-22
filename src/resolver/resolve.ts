import { EquationTree, ResultTree, VariableLookup, FunctionLookup, UnitLookup } from '../types'
import { getUnit, getUnitless, isEmptyUnit, isSameUnit} from './unit-utils'
import operators from './operators'
import negate from './negate'
import defaultVariables from './default-variables'
import defaultFunctions from './default-functions'
import throwUnknownType from '../throw-unknown-type'

export default function resolve(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): ResultTree {
    switch (tree.type) {
        case 'number':
            return {
                type: 'number',
                value: parseFloat(tree.value)
            }
        case 'infinity':
            return {
                type: 'number',
                value: Infinity,
            }
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
        case 'matrix': {
            // Keep track of resolved unit
            let unit: UnitLookup | null = null
            const values = tree.values.map((row) => row.map((cell) => {
                const value = resolve(cell, variables, functions)
                // Compare units
                if (unit) {
                    if (!isSameUnit(unit, getUnit(value))) {
                        throw new Error(`Equation resolve: all matrix cells must have same unit`)
                    }
                } else {
                    unit = getUnit(value)
                }
                // Ensure all children are unitless numbers
                const unitlessValue = getUnitless(value)
                if (unitlessValue.type !== 'number') {
                    throw new Error(`Equation resolve: cannot resolve nested matrices`)
                }

                return unitlessValue
            }))

            // Wrap in unit if necessary
            if (!unit || isEmptyUnit(unit)) {
                return {
                    type: 'matrix',
                    m: tree.m,
                    n: tree.n,
                    values,
                }
            } else {
                return {
                    type: 'unit',
                    units: unit,
                    value: {
                        type: 'matrix',
                        m: tree.m,
                        n: tree.n,
                        values,
                    },
                }
            }
        }

        default:
            return throwUnknownType(tree, (type) => `Equation resolve: cannot resolve type "${type}"`)
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
