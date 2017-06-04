import { EquationTree, ResultTree, ResultTreeUnit, VariableLookup, FunctionLookup } from '../types'
import resolve from './resolve'
import defaultVariables from './default-variables'
import { multiply } from './operators'
import { isSameUnit } from './unit-utils'

// Attempt to simplify unit to one of these if possible
const simplifiableUnits = ['N', 'J', 'W', 'Pa', 'Hz', 'lx', 'C', 'V', 'F', 'Ω', 'S', 'Wb', 'T', 'H', 'Gy']

export default function resolveTree(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): EquationTree {
    const result = resultToEquation(resolve(tree, variables, functions))
    return {
        type: 'comparison',
        comparison: '=',
        a: tree,
        b: result,
    }
}

function resultToEquation(result: ResultTree): EquationTree {
    switch (result.type) {
        case 'number':
            if (result.value < 0) {
                return {
                    type: 'negative',
                    value: simplifyNumber(-result.value),
                }
            } else {
                return simplifyNumber(result.value)
            }
        case 'matrix':
            return {
                type: 'matrix',
                m: result.m,
                n: result.n,
                values: result.values.map((row) => row.map(resultToEquation)),
            }
        case 'unit': {
            const simplifiedUnit = simplifyUnit(result)
            // Terms above fraction
            const positive: EquationTree[] = []
            // Terms below fraction
            const negative: EquationTree[] = []
            for (const [unit, factor] of Object.entries(simplifiedUnit.units)) {
                if (factor === 0) { continue }

                if (factor > 0) {
                    positive.push(getExponent(unit, factor))
                } else {
                    negative.push(getExponent(unit, -factor))
                }
            }

            const value = resultToEquation(simplifiedUnit.value)

            // If no units were actually added, just render without
            if (positive.length === 0 && negative.length === 0) {
                return value
            }

            // Retain proper ordering of operations be letting negative wrap multiplication
            if (value.type === 'negative') {
                return {
                    type: 'negative',
                    value: {
                        type: 'operator',
                        operator: ' ',
                        a: value.value,
                        b: divideLists(positive, negative),
                    },
                }
            } else {
                return {
                    type: 'operator',
                    operator: ' ',
                    a: value,
                    b: divideLists(positive, negative),
                }
            }

        }
    }
}

function simplifyNumber(value: number): EquationTree {
    // Handle infinity
    if (value === Infinity) {
        return {
            type: 'infinity',
        }
    }

    // Float exponent
    const factor = Math.log10(value)

    if (value === 0 || Math.abs(factor) < 5) {
        // Retain regular number
        return {
            type: 'number',
            value: formatNumber(value),
        }
    } else {
        // Rewrite as power-of-ten
        const exponent = Math.floor(factor)
        const significand = value / Math.pow(10, exponent)
        return {
            type: 'operator',
            operator: '*',
            a: {
                type: 'number',
                value: formatNumber(significand),
            },
            b: {
                type: 'operator',
                operator: '^',
                a: {
                    type: 'number',
                    value: '10',
                },
                b: {
                    type: 'number',
                    value: formatNumber(exponent),
                },
            },
        }
    }
}

function formatNumber(value: number, digits = 3, commaSep = '.'): string {
    return ensurePrecision(value, digits)
        .split('.')
        .join(commaSep)
}

// number.toPrecision with trailing zeros stripped
// Avoids scientific notation for large numbers
function ensurePrecision(value: number, digits: number) {
    // Handle cases where scientific notation would be used
    if (Math.log(Math.abs(value)) * Math.LOG10E >= digits) {
        return Math.round(value).toString()
    }
    // Strip trailing zeroes
    return Number(value.toPrecision(digits)).toString()
}


function simplifyUnit(result: ResultTreeUnit): ResultTreeUnit {
    const unit = simplifiableUnits.find((u) => {
        const variable = defaultVariables[u]

        return variable &&
            variable.type === 'unit' &&
            variable.value.type === 'number' &&
            isSameUnit(variable.units, result.units)
    })

    if (unit) {
        const variable = defaultVariables[unit] as ResultTreeUnit
        return {
            type: 'unit',
            units: { [unit]: 1 },
            value: multiply(result.value, variable.value),
        }
    } else {
        return result
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
            b: { type: 'number', value: factor.toString() },
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
        return {
            type: 'number',
            value: '1',
        }
    }
    let current = list[0]
    // Build multiplication tree
    for (let i = 1; i < list.length; i++) {
        current = {
            type: 'operator',
            operator: ' ',
            a: current,
            b: list[i],
        }
    }

    return current
}
