import { ReactNode } from 'react'
import { EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

type Combined = EquationParserError | EquationResolveError

export type ErrorHandler = {
    [Key in Combined['errorType']]?: (node: Extract<Combined, { errorType: Key}>) => ReactNode
}

export const getError = (node: Combined, handlers: ErrorHandler): ReactNode => {
    const handler = handlers[node.errorType]

    if (!handler) return `Error: ${node.errorType}`

    return handler(node as any)
}

export const defaultErrorHandler: ErrorHandler = {
    // Parser errors
    /** `2 3` */
    numberWhitespace: () => 'Cannot have spaces inside numbers',
    /** `1.2.3` */
    invalidNumber: () => 'Invalid number',
    /** `2+*3` */
    adjecentOperator: () => 'Two operators cannot be adjecent',
    /** `2 & 3` */
    invalidChar: ({ character }) => `Invalid character '${character}'`,
    /** `* 3` */
    invalidUnary: ({ symbol }) => `'${symbol}' cannot be a unary operator`,
    /** Theoretical case, no known reproduction */
    multipleExpressions: () => 'An unexpected parsing error occured',
    /** `[[1,2][1,2,3]]` */
    matrixMixedDimension: ({ lengthExpected, lengthReceived }) => `Matrix-row has length ${lengthReceived}, but should be ${lengthExpected}`,
    /** `[[]]` */
    matrixEmpty: () => 'Matrix must contain at least one expression',
    /** `[]` */
    vectorEmpty: () => 'Vector must contain at least one expression',
    /** Closing an un-opened parenthesis, `2+3)` */
    expectedEnd: () => 'Expected end of equation',
    /** `[2,3` */
    expectedSquareBracket: () => 'Missing closing square bracket',
    /** `5 * (2 + 3` */
    expectedCloseParens: () => 'Missing closing parenthesis',
    /** `2 + 3 +` */
    operatorLast: () => 'Equation cannot end on an operator',

    // Resolver errors
    functionUnknown: ({ name }) => `Unknown function ${name}`,
    functionArgLength: ({ name, minArgs, maxArgs }) => minArgs === maxArgs
        ? `${name} must have ${minArgs} arguments`
        : `${name} must have ${minArgs}-${maxArgs} arguments`,
    functionNumberOnly: ({ name }) => `Arguments of ${name} must be unitless numbers`,

    functionSqrt1Positive: ({ name }) => `First argument of ${name} must be positive`,
    functionRoot1PositiveInteger: ({ name }) => `First argument of ${name} must be a positive integer`,
    functionRoot2Positive: ({ name }) => `Second argument of ${name} must be positive`,
    functionSum1Variable: ({ name, variableType }) => `First argument of ${name} must be a variable, was ${variableType}`,
    functionSum2Integer: ({ name }) => `Second argument of ${name} must be an integer`,
    functionSum3Integer: ({ name }) => `Third argument of ${name} must be an integer`,

    variableUnknown: ({ name }) => `Unknown variable ${name}`,

    plusDifferentUnits: () => `Cannot add numbers with different units`,
    plusMatrixMismatch: ({ aDimensions, bDimensions }) => `Cannot add matrices of dimensions ${aDimensions} and ${bDimensions}`,
    plusminusUnhandled: () => `Plus-minus operator is currently not supported`,
    scalarProductUnbalanced: ({ aLength, bLength }) => `Cannot calculate scalar (dot) product of vectors of size ${aLength} and ${bLength}`,
    vectorProduct3VectorOnly: () => `Vector (cross) product requires 2 3-vectors`,
    matrixProductMatrixMismatch: ({ aDimensions, bDimensions }) => `Cannot multiply matrices of dimensions ${aDimensions} and ${bDimensions}`,
    multiplyImplicitNoVectors: () => `Cannot multiply vectors without symbol, use either dot or cross`,
    divideNotZero: () => `Cannot divide by zero`,
    divideMatrixMatrix: () => `Cannot divide matrices with each other`,
    powerUnitlessNumberExponent: () => `Exponent must be a unitless number`,

    operatorInvalidArguments: ({ operator, a, b }) => `Operator '${operator}' not defined for ${a} and ${b}`,

    noComparison: () => `Cannot evaluate a comparison`,

    matrixDifferentUnits: () => `All matrix-cells must have the same unit`,
    matrixNoNesting: () => `Cannot nest matrices`,

    invalidEquation: () => `Cannot resolve an invalid equation`,

    placeholder: () => `Cannot evaluate a placeholder`,

    invalidUnit: () => `Must be a valid unit`,
}
