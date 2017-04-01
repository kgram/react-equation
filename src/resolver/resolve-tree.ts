import { EquationTree, ResultTree, VariableLookup, FunctionLookup } from '../types'
import resolve from './resolve'

export default function resolveTree(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): EquationTree {
    return resultToEquation(resolve(tree, variables, functions))
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
        case 'matrix':
            return {
                type: 'matrix',
                m: result.m,
                n: result.n,
                values: result.values.map((row) => row.map(resultToEquation)),
            }
    }
}
