import { ResultTree, ResultTreeNumber } from '../types'

export default function isInteger(x: ResultTree): x is ResultTreeNumber {
    return x.type === 'number' && Math.round(x.value) === x.value
}
