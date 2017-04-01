import { ResultTree } from '../types'

export default function isInteger(x: ResultTree) {
    return x.type === 'number' && Math.round(x.value) === x.value
}
