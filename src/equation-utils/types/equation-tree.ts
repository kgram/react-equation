import Operator from './operator'

export type EquationTreeVariable = {
    type: 'variable',
    name: string,
}

export type EquationTreeNumber = {
    type: 'number',
    value: number,
}

export type EquationTreeNegative = {
    type: 'negative',
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

export type EquationTree =
    EquationTreeVariable |
    EquationTreeNumber |
    EquationTreeNegative |
    EquationTreeFunction |
    EquationTreeBlock |
    EquationTreeOperator |
    EquationTreeEquals
