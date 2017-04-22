import { EquationTree, VariableLookup, FunctionLookup, ResolverFunction, ResultTreeNumber } from '../types'

import checkArgs from './check-args'
import isInteger from './is-integer'
import valueWrap from './value-wrap'
import { plus } from './operators'
import { resolve } from '.'

const defaultFunctions: FunctionLookup = {
    sin: numberFunctionWrapper(Math.sin),
    cos: numberFunctionWrapper(Math.cos),
    tan: numberFunctionWrapper(Math.tan),
    asin: numberFunctionWrapper(Math.asin),
    acos: numberFunctionWrapper(Math.acos),
    atan: numberFunctionWrapper(Math.atan),
    atan2: numberFunctionWrapper(Math.atan2, 2, 2),

    abs: numberFunctionWrapper(Math.abs),
    ceil: numberFunctionWrapper(Math.ceil),
    floor: numberFunctionWrapper(Math.floor),
    round: numberFunctionWrapper((x, precision = 0) => {
        const factor = Math.pow(10, precision)
        return Math.round(x * factor) / factor
    }, 1 , 2),

    max: numberFunctionWrapper(Math.max, 1, Infinity),
    min: numberFunctionWrapper(Math.min, 1, Infinity),

    pow: numberFunctionWrapper(Math.pow, 2, 2),
    sqrt: numberFunctionWrapper(Math.sqrt, 1, 1, (name, x) => {
        if (x < 0) {
            throw new Error(`Equation resolve: radicand of ${name} cannot be negative`)
        }
    }),

    root: numberFunctionWrapper(
        (f, x) => Math.sign(x) * Math.pow(Math.abs(x), 1 / f),
        2, 2,
        (name, f, x) => {
            if (Math.round(f) !== f || f <= 0) {
                throw new Error(`Equation resolve: index of ${name} must be a positive integer`)
            }
            if (f % 2 === 0 && x < 0) {
                throw new Error(`Equation resolve: radicand of ${name} cannot be negative when index is even`)
            }
        },
    ),

    ln: numberFunctionWrapper(Math.log),
    log: numberFunctionWrapper((x, base = 10) => Math.log(x) / Math.log(base), 1, 2),

    sum,
}

function sum(name: string, args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) {
    checkArgs(name, args, 4, 4)

    const [variable, startTree, endTree, expression] = args

    if (variable.type !== 'variable') {
        throw new Error(`Equation resolve: first argument of ${name} must be a variable, not ${args[0].type}`)
    }

    let start = resolve(startTree, variables, functions)
    let end = resolve(endTree, variables, functions)
    if (!isInteger(start)) {
        throw new Error(`Equation resolve: second argument of ${name} must be an integer (is ${start})`)
    }
    if (!isInteger(end)) {
        throw new Error(`Equation resolve: third argument of ${name} must be an integer (is ${end})`)
    }
    if (start > end) {
        [start, end] = [end, start]
    }
    const enhancedVariables = { ...variables }
    // Get initial value
    enhancedVariables[variable.name] = start
    let sum = resolve(expression, enhancedVariables, functions)
    for (let i = start.value + 1; i <= end.value; i++) {
        enhancedVariables[variable.name] = valueWrap(i)
        sum = plus(sum, resolve(expression, enhancedVariables, functions))
    }

    return sum
}

function numberFunctionWrapper(
    func: (...args: number[]) => number,
    minArgs = 1,
    maxArgs = 1,
    validate?: (name: string, ...args: number[]) => void,
): ResolverFunction {
    return (
        name: string,
        args: EquationTree[],
        variables: VariableLookup,
        functions: FunctionLookup,
    ) => {
        checkArgs(name, args, minArgs, maxArgs)

        const resolvedArgs = args.map((arg) => resolve(arg, variables, functions))

        if (!resolvedArgs.every((arg) => arg.type === 'number')) {
            throw new Error(`Equation resolve: arguments of ${name} must be numbers`)
        }

        const numberArgs = (resolvedArgs as ResultTreeNumber[]).map((arg) => arg.value)

        if (validate) {
            validate(name, ...numberArgs)
        }

        return valueWrap(func(...numberArgs))
    }
}

export default defaultFunctions
