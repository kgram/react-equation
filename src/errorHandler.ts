import { ReactNode } from 'react'
import { EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

type Combined = EquationParserError | EquationResolveError

export type ErrorHandler = {
    [Key in Combined['errorType']]?: (node: Extract<Combined, { errorType: Key}>) => ReactNode
}

export const defaultErrorHandler: ErrorHandler = {
    // Parser errors
    numberWhitespace: () => 'Cannot have spaces inside numbers',
    invalidNumber: () => 'Invalid number',
    adjecentOperator: () => 'Two operators cannot be adjecent',
    invalidChar: ({ character }) => `Invalid character '${character}'`,
    invalidUnary: ({ symbol }) => `'${symbol}' cannot be a unary operator`,
    multipleExpressions: () => 'An unexpected parsing error occured',
    matrixMixedDimension: ({ lengthExpected, lengthReceived }) => `Matrix-row has length ${lengthReceived}, but should be ${lengthExpected}`,
    matrixEmpty: () => 'Matrix must contain at least one expression',
    vectorEmpty: () => 'Vector must contain at least one expression',
    expectedEnd: () => 'Expected end of equation',
    expectedSquareBracket: () => 'Missing closing square bracket',
    expectedCloseParens: () => 'Missing closing parenthesis',
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
