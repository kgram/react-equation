import {
    EquationTreeNumber,
    EquationTreeNegative,
} from '../../src/types'

export default function toNumber(number: number): EquationTreeNumber | EquationTreeNegative {
    if (number < 0) {
        return {
            type: 'negative',
            value: toNumber(-number),
        }
    }
    return {
        type: 'number',
        value: number.toString(),
    }
}
