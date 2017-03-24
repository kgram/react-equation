import { EquationTree, Operator } from '../types'

export type VariableLookup = {
    [key: string]: number,
}

export type ResolverFunction = (args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) => number

export type FunctionLookup = {
    [key: string]: ResolverFunction,
}

const defaultVariables: VariableLookup = {
    e: Math.E,
    pi: Math.PI,
    π: Math.PI,
}

const defaultFunctions: FunctionLookup = {
    abs: numberFunctionWrapper(Math.abs),
    acos: numberFunctionWrapper(Math.acos),
    asin: numberFunctionWrapper(Math.asin),
    atan: numberFunctionWrapper(Math.atan),
    atan2: numberFunctionWrapper( Math.atan2),
    ceil: numberFunctionWrapper(Math.ceil),
    cos: numberFunctionWrapper(Math.cos),
    exp: numberFunctionWrapper(Math.exp),
    floor: numberFunctionWrapper(Math.floor),
    ln: numberFunctionWrapper(Math.log),
    max: numberFunctionWrapper(Math.max),
    min: numberFunctionWrapper(Math.min),
    pow: numberFunctionWrapper(Math.pow),
    random: numberFunctionWrapper(Math.random),
    round: numberFunctionWrapper(Math.round),
    sin: numberFunctionWrapper(Math.sin),
    sqrt: numberFunctionWrapper(Math.sqrt),
    tan: numberFunctionWrapper(Math.tan),

    log: numberFunctionWrapper((x, base = 10) => Math.log(x) / Math.log(base)),

    sum: ([variable, startTree, endTree, expression], variables, functions) => {
        if (variable.type !== 'variable') {
            throw new Error('Equation resolve: first argument of sum must be a variable')
        }
        let start = resolve(startTree, variables, functions)
        let end = resolve(endTree, variables, functions)
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

function numberFunctionWrapper(func: (...args: number[]) => number) {
    return (
        args: EquationTree[],
        variables: VariableLookup,
        functions: FunctionLookup,
    ) => func(...args.map((arg) => resolve(arg, variables, functions)))
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
        case '*':
        case '**':
            return a * b
        case '/':
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
    const result = func(args, variables, functions)
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
    name: string,
    argNames: string[],
    expression: EquationTree,
): ResolverFunction {
    return (args, variables, functions) => {
        if (args.length !== argNames.length) {
            throw new Error(`Equation resolve: function "${name}" takes ${argNames.length} arguments, not ${args.length}`)
        }

        const enhancedVariables: VariableLookup = { ...variables }

        argNames.forEach((n, idx) => {
            enhancedVariables[n] = resolve(args[idx], variables, functions)
        })

        return resolve(expression, enhancedVariables, functions)
    }
}
