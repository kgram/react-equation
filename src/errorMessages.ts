import { ReactNode } from 'react'
import { EquationNodeParserError } from 'equation-parser'

export const errorMessages = {
    numberWhitespace: () => 'Cannot have spaces inside numbers' as ReactNode,
    invalidNumber: () => 'Invalid number' as ReactNode,
    adjecentOperator: () => 'Two operators cannot be adjecent' as ReactNode,
    invalidChar: (char: string) => `Invalid character '${char}'` as ReactNode,
    invalidUnary: (symbol: string) => `'${symbol}' cannot be a unary operator` as ReactNode,
    noOperand: (symbol: string) => `'${symbol}' must have operands` as ReactNode,
    multipleExpressions: () => 'An unexpected parsing error occured' as ReactNode,
    matrixMixedDimension: (expected: number, received: number) => `Matrix-row has length ${received}, but should be ${expected}` as ReactNode,
    matrixEmpty: () => 'Matrix must contain at least one expression' as ReactNode,
    vectorEmpty: () => 'Vector must contain at least one expression' as ReactNode,
    expectedEnd: () => 'Expected end of equation' as ReactNode,
    expectedSquareBracket: () => 'Missing closing square bracket' as ReactNode,
    expectedCloseParens: () => 'Missing closing parenthesis' as ReactNode,
    operatorLast: () => 'Equation cannot end on an operator' as ReactNode,
} as const

// Force a typecheck of correct keys, while shaping specific methods.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typeCheck: { [Key in EquationNodeParserError['errorType']]: (...args: any[]) => ReactNode } = errorMessages
