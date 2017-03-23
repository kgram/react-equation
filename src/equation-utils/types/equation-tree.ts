import Operator from './operator'

type EquationTree = {
    type: 'variable',
    name: string,
} | {
    type: 'number',
    value: number,
} | {
    type: 'negative',
    value: EquationTree,
} | {
    type: 'function',
    name: string,
    args: EquationTree[],
} | {
    type: 'block',
    child: EquationTree,
} | {
    type: 'operator',
    operator: Operator,
    a: EquationTree,
    b: EquationTree,
} | {
    type: 'equals',
    a: EquationTree,
    b: EquationTree,
}

export default EquationTree
