import { ResultTreeNumber } from '../types'

export default function valueWrap(x: number): ResultTreeNumber {
    return {
        type: 'number',
        value: x,
    }
}
