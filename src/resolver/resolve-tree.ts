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
        case 'unit':
            // Terms above fraction
            const positive: EquationTree[] = []
            // Terms below fraction
            const negative: EquationTree[] = []
            for (const [unit, factor] of Object.entries(result.units)) {
                if (factor === 0) { continue }

                if (factor > 0) {
                    positive.push(getExponent(unit, factor))
                } else {
                    negative.push(getExponent(unit, -factor))
                }
            }
            // If no units were actually added, just render without
            if (positive.length === 0 && negative.length === 0) {
                return resultToEquation(result.value)
            }

            return {
                type: 'operator',
                operator: '**',
                a: resultToEquation(result.value),
                b: divideLists(positive, negative),
            }
    }
}

function getExponent(unit: string, factor: number): EquationTree {
    if (factor === 1) {
        return { type: 'variable', name: unit }
    } else {
       return {
            type: 'operator',
            operator: '^',
            a: { type: 'variable', name: unit },
            b: { type: 'number', value: factor },
        }
    }
}

function divideLists(a: EquationTree[], b: EquationTree[]): EquationTree {
    if (b.length === 0) {
        return multiplyList(a)
    }

    return {
        type: 'operator',
        operator: '/',
        a: multiplyList(a),
        b: multiplyList(b),
    }
}

function multiplyList(list: EquationTree[]): EquationTree {
    if (list.length === 0) {
        return { type: 'number', value: 1 }
    }
    if (list.length === 1) {
        return list[0]
    }
    let current: EquationTree = {
        type: 'operator',
        operator: '**',
        a: list[0],
        b: list[1],
    }
    // Build multiplication tree
    for (let i = 2; i < list.length; i++) {
        current = {
            type: 'operator',
            operator: '**',
            a: current,
            b: list[i],
        }
    }

    return current
}
