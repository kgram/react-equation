import { resolve } from '../../src/resolver'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('number', () => {
    expect(resolve({
        type: 'negative',
        value: toNumber(5),
    })).toEqual({
        type: 'number',
        value: -5,
    })
})

test('matrix', () => {
    expect(resolve({
        type: 'negative',
        value: {
            type: 'matrix', n: 3, m: 2,
            values: [
                [toNumber(1), toNumber(2), toNumber(3)],
                [toNumber(4), toNumber(5), toNumber(6)],
            ]
        },
    })).toEqual({
        type: 'matrix', n: 3, m: 2,
        values: [
            [{ type: 'number', value: -1 }, { type: 'number', value: -2 }, { type: 'number', value: -3 }],
            [{ type: 'number', value: -4 }, { type: 'number', value: -5 }, { type: 'number', value: -6 }],
        ]
    })
})
