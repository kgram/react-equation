import {
    EquationTreeVariable,
} from '../../src/types'

export default function toVariable(name: string): EquationTreeVariable {
    return {
        type: 'variable',
        name,
    }
}
