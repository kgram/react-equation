import { EquationTree, ResultTree, ResultTreeNumber, Operator } from '../types'

export type VariableLookup = {
    [key: string]: ResultTree,
}

export type ResolverFunction = (name: string, args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) => ResultTree

export type FunctionLookup = {
    [key: string]: ResolverFunction,
}

const defaultVariables: VariableLookup = {
    e: valueWrap(Math.E),
    pi: valueWrap(Math.PI),
    π: valueWrap(Math.PI),
}

function valueWrap(x: number): ResultTreeNumber {
    return {
        type: 'number',
        value: x,
    }
}

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

    sum: (name, args, variables, functions) => {
        checkFunctionArgs(name, args, 4, 4)

        const [variable, startTree, endTree, expression] = args

        if (variable.type !== 'variable') {
            throw new Error(`Equation resolve: first argument of ${name} must be a variable, not ${args[0].type}`)
        }

        let start = resolve(startTree, variables, functions)
        let end = resolve(endTree, variables, functions)
        if (start.type !== 'number' || Math.round(start.value) !== start.value) {
            throw new Error(`Equation resolve: second argument of ${name} must be an integer (is ${start})`)
        }
        if (end.type !== 'number' || Math.round(end.value) !== end.value) {
            throw new Error(`Equation resolve: third argument of ${name} must be an integer (is ${end})`)
        }
        if (start > end) {
            [start, end] = [end, start]
        }
        const enhancedVariables = { ...variables }
        let sum = valueWrap(0)
        for (let i = start.value; i <= end.value; i++) {
            enhancedVariables[variable.name] = valueWrap(i)
            sum = operators['+'](sum, resolve(expression, enhancedVariables, functions))
        }

        return sum
    },
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
        checkFunctionArgs(name, args, minArgs, maxArgs)

        const resolvedArgs = args.map((arg) => resolve(arg, variables, functions))

        if (!resolvedArgs.every((arg) => arg.type === 'number')) {
            throw new Error(`Equation resolve: arguments of ${name} must be numbers`)
        }

        const numberArgs = resolvedArgs.map((arg) => arg.value)

        if (validate) {
            validate(name, ...numberArgs)
        }

        return valueWrap(func(...numberArgs))
    }
}

function checkFunctionArgs(name: string, args: EquationTree[], minArgs: number, maxArgs: number) {
    if (args.length < minArgs || args.length > maxArgs) {
        if (minArgs === maxArgs) {
            throw new Error(`Equation resolve: function "${name}" takes ${minArgs} arguments, not ${args.length}`)
        } else {
            throw new Error(`Equation resolve: function "${name}" takes ${minArgs}-${maxArgs} arguments, not ${args.length}`)
        }
    }
}

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

const operators: { [key in Operator]: (a: ResultTree, b: ResultTree) => ResultTree } = {
    '+': (a, b) => {
        switch (a.type) {
            case 'number':
                switch (b.type) {
                    case 'number':
                        return valueWrap(a.value + b.value)
                }
        }
        throw new Error(`Equation resolve: cannot handle operator`)
    },
    '-': (a, b) =>  operators['+'](a, negate(b)),
    '±': (a, b) => { throw new Error('Equation resolve: cannot handle ± operator') },
    '*': (a, b) => {
        switch (a.type) {
            case 'number':
                switch (b.type) {
                    case 'number':
                        return valueWrap(a.value * b.value)
                }
        }
        throw new Error(`Equation resolve: cannot handle operator`)
    },
    '**': (a, b) => operators['*'](a, b),
    '/': (a, b) => {
        if (b.type !== 'number') {
            throw new Error(`Equation resolve: divisor must be a number`)
        }
        if (b.value === 0) {
            throw new Error(`Equation resolve: cannot divide by 0`)
        }
        switch (a.type) {
            case 'number':
                return valueWrap(a.value / b.value)
        }
        throw new Error(`Equation resolve: cannot handle operator`)
    },
    '^': (a, b) => {
        if (b.type !== 'number') {
            throw new Error(`Equation resolve: exponent must be a number`)
        }
        switch (a.type) {
            case 'number':
                return valueWrap(Math.pow(a.value, b.value))
        }
        throw new Error(`Equation resolve: cannot handle operator`)
    },
}

function negate(result: ResultTree): ResultTree {
    switch (result.type) {
        case 'number':
            return {
                type: 'number',
                value: -result.value,
            }
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

export function buildResolver(
    argNames: string[],
    expression: EquationTree,
    expressionVariables: VariableLookup,
    expressionFunctions: FunctionLookup,
): ResolverFunction {
    expressionVariables = { ...expressionVariables }
    expressionFunctions = { ...expressionFunctions }

    return (name, args, argVariables, argFunctions) => {
        checkFunctionArgs(name, args, argNames.length, argNames.length)

        argNames.forEach((n, idx) => {
            expressionVariables[n] = resolve(args[idx], argVariables, argFunctions)
        })

        return resolve(expression, expressionVariables, expressionFunctions)
    }
}
