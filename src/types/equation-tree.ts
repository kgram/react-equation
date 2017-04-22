import Operator from './operator'

export type EquationTreeVariable = {
    type: 'variable',
    name: string,
}

export type EquationTreeNumber = {
    type: 'number',
    value: string,
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

export type EquationTreeEquals = {
    type: 'equals',
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
    EquationTreeNegative |
    EquationTreePlusMinus |
    EquationTreeFunction |
    EquationTreeBlock |
    EquationTreeOperator |
    EquationTreeEquals |
    EquationTreeMatrix
