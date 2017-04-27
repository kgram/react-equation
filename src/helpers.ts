import {
    EquationTreeVariable,
    EquationTreeNumber,
    EquationTreeNegative,
} from './types'

export function buildNumber(number: number): EquationTreeNumber | EquationTreeNegative {
    if (number < 0) {
        return {
            type: 'negative',
            value: buildNumber(-number),
        }
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