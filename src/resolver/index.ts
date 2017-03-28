import { EquationTree, Operator } from '../types'

export type VariableLookup = {
    [key: string]: number,
}

export type ResolverFunction = (name: string, args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) => number

export type FunctionLookup = {
    [key: string]: ResolverFunction,
}

const defaultVariables: VariableLookup = {
    e: Math.E,
    pi: Math.PI,
    π: Math.PI,
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
        if (Math.round(start) !== start) {
            throw new Error(`Equation resolve: second argument of ${name} must be an integer (is ${start})`)
        }
        if (Math.round(end) !== end) {
            throw new Error(`Equation resolve: third argument of ${name} must be an integer (is ${end})`)
        }
        if (start > end) {
            [start, end] = [end, start]
        }
        const enhancedVariables = { ...variables }
        let sum = 0
        for (let i = start; i <= end; i++) {
            enhancedVariables[variable.name] = i
            sum += resolve(expression, enhancedVariables, functions)
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

        if (validate) {
            validate(name, ...resolvedArgs)
        }

        return func(...resolvedArgs)
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
    return numberToTree(resolve(tree, variables, functions))
}

export function resolve(
    tree: EquationTree,
    variables: VariableLookup = {},
    functions: FunctionLookup = {},
): number {
    switch (tree.type) {
        case 'number':
            return tree.value
        case 'variable':
            return resolveVariable(tree.name, variables)
        case 'negative':
            return -resolve(tree.value, variables, functions)
        case 'plusminus':
            throw new Error('Equation resolve: cannot handle ± operator')
        case 'block':
            return resolve(tree.child, variables, functions)
        case 'operator':
            return resolveOperator(
                tree.operator,
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

function resolveVariable(name: string, variables: VariableLookup) {
    if (variables.hasOwnProperty(name)) {
        return variables[name]
    } else if (defaultVariables.hasOwnProperty(name)) {
        return defaultVariables[name]
    } else {
        throw new Error(`Equation resolve: unknown variable "${name}"`)
    }
}

function resolveOperator(op: Operator, a: number, b: number) {
    switch (op) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '±':
            throw new Error('Equation resolve: cannot handle ± operator')
        case '*':
        case '**':
            return a * b
        case '/':
            if (b === 0) {
                throw new Error(`Equation resolve: cannot divide by 0`)
            }
            return a / b
        case '^':
            return Math.pow(a, b)
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
    const result = func(name, args, variables, functions)
    if (typeof result !== 'number' || isNaN(result)) {
        throw new Error(`Equation resolve: function "${name}" did not return a number`)
    }

    return result
}

function numberToTree(x: number): EquationTree {
    if (x < 0) {
        return {
            type: 'negative',
            value: {
                type: 'number',
                value: -x,
            },
        }
    } else {
        return {
            type: 'number',
            value: x,
        }
    }
}

export function buildResolver(
    argNames: string[],
    expression: EquationTree,
    variables: VariableLookup,
    functions: FunctionLookup,
): ResolverFunction {
    variables = { ...variables }
    functions = { ...functions }

    return (name, args, innerVariables, innerFunctions) => {
        checkFunctionArgs(name, args, argNames.length, argNames.length)

        argNames.forEach((n, idx) => {
            variables[n] = resolve(args[idx], innerVariables, innerFunctions)
        })

        return resolve(expression, variables, functions)
    }
}
