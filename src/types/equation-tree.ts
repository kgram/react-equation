import Operator from './operator'

export type EquationTreeVariable = {
    type: 'variable',
    name: string,
}

export type EquationTreeNumber = {
    type: 'number',
    value: string,
}

export type EquationTreeInfinity = {
    type: 'infinity',
}

export type EquationTreeNegative = {
    type: 'negative',
    value: EquationTree,
}

export type EquationTreePlusMinus = {
    type: 'plusminus',
    value: EquationTree,
}

export type EquationTreeFunction = {
    type: 'function',
    name: string,
    args: EquationTree[],
}

export type EquationTreeBlock = {
    type: 'block',
    child: EquationTree,
}

export type EquationTreeOperator = {
    type: 'operator',
    operator: Operator,
    a: EquationTree,
    b: EquationTree,
}

export type EquationTreeComparison = {
    type: 'comparison',
    comparison: '=' | '<' | '>' | '≤' | '≥' | '≈',
    a: EquationTree,
    b: EquationTree,
}

export type EquationTreeMatrix = {
    type: 'matrix',
    n: number,
    m: number,
    values: EquationTree[][],
}

export type EquationTree =
    EquationTreeVariable |
    EquationTreeNumber |
    EquationTreeInfinity |
    EquationTreeNegative |
    EquationTreePlusMinus |
    EquationTreeFunction |
    EquationTreeBlock |
    EquationTreeOperator |
    EquationTreeComparison |
    EquationTreeMatrix
