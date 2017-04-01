import { ResultTreeMatrix, ResultTreeNumber } from '../types'

export default function mapMatrix(result: ResultTreeMatrix, mapper: (cell: ResultTreeNumber) => ResultTreeNumber): ResultTreeMatrix {
    return {
        type: 'matrix',
        m: result.m,
        n: result.n,
        values: result.values.map((row) => row.map(mapper)),
    }
}
