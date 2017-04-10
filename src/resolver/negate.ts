import { ResultTree } from '../types'
import valueWrap from './value-wrap'
import mapMatrix from './map-matrix'

export default function negate<T extends ResultTree>(result: T): T;
export default function negate(result: ResultTree): ResultTree {
    switch (result.type) {
        case 'number':
            return valueWrap(-result.value)
        case 'matrix':
            return mapMatrix(result, (cell) => negate(cell))
        case 'unit':
            return {
                type: 'unit',
                units: { ...result.units },
                value: negate(result.value),
            }
    }
}
