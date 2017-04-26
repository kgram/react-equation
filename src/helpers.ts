import {
    EquationTreeVariable,
    EquationTreeNumber,
} from 'types'

export function buildNumber(number: number): EquationTreeNumber {
    if (number < 0) {
        throw new Error('Numbers in equation-tree must be positive. Wrap in `negative`')
    }
    return {
        type: 'number',
        value: number.toString(),
    }
}

export function buildVariable(name: string): EquationTreeVariable {
    return {
        type: 'variable',
        name,
    }
}