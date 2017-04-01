import { ResultTree, ResultTreeNumber, ResultTreeMatrix } from '../types'
import valueWrap from './value-wrap'
import mapMatrix from './map-matrix'

export default function negate(result: ResultTree): ResultTree {
    switch (result.type) {
        case 'number':
            return valueWrap(-result.value)
        case 'matrix':
            // Manual cast since typescript can't know return type is same as input
            return mapMatrix(result, (cell) => negate(cell) as ResultTreeNumber)
        case 'unit':
            return {
                type: 'unit',
                units: { ...result.units },
                // Manual cast since typescript can't know return type is same as input
                value: negate(result.value) as ResultTreeNumber | ResultTreeMatrix,
            }
    }
}
