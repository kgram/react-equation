import EquationTree, { operator } from './equation-tree'

interface IVariableLookup {
    [key: string]: number
}

interface IFunctionLookup {
    [key: string]: (args: EquationTree[], variables: IVariableLookup, functions: IFunctionLookup) => number
}

const defaultVariables: IVariableLookup = {
    e: Math.E,
    pi: Math.PI,
    π: Math.PI,
}

const defaultFunctions: IFunctionLookup = {
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
        variables: IVariableLookup,
        functions: IFunctionLookup,
    ) => func(...args.map((arg) => resolve(arg, variables, functions)))
}

export default function resolve(
    tree: EquationTree,
    variables: IVariableLookup = {},
    functions: IFunctionLookup = {},
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
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation resolve: cannot resolve type "${type}"`)
    }
}

function resolveVariable(name: string, variables: IVariableLookup) {
    if (variables.hasOwnProperty(name)) {
        return variables[name]
    } else if (defaultVariables.hasOwnProperty(name)) {
        return defaultVariables[name]
    } else {
        throw new Error(`Equation resolve: unknown variable "${name}"`)
    }
}

function resolveOperator(op: operator, a: number, b: number) {
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

function resolveFunction(name: string, args: EquationTree[], variables: IVariableLookup, functions: IFunctionLookup) {
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
