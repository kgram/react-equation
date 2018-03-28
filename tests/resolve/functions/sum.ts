import { resolve } from '../../../src/resolver'

import toVariable from '../../helpers/toVariable'
import toNumber from '../../helpers/toNumber'

import '../../helpers/toAlmostEqual'

test('constant', () => {
    const m = 5
    const n = 10
    expect(resolve({
        type: 'function',
        name: 'sum',
        args: [toVariable('i'), toNumber(m), toNumber(n), toNumber(1)]
    })).toAlmostEqual({
        type: 'number',
        value: (n + 1 - m),
    })
})

test('linear (arithmetic serries)', () => {
    const m = 5
    const n = 10
    expect(resolve({
        type: 'function',
        name: 'sum',
        args: [toVariable('i'), toNumber(m), toNumber(n), toVariable('i')]
    })).toAlmostEqual({
        type: 'number',
        value: (n + 1 - m) * (n + m) / 2,
    })
})

test('exponential (geometric series)', () => {
    const m = 5
    const n = 10
    const a = 4
    expect(resolve({
        type: 'function',
        name: 'sum',
        args: [toVariable('i'), toNumber(m), toNumber(n), { type: 'operator', operator: '^', a: toNumber(a), b: toVariable('i') }]
    })).toAlmostEqual({
        type: 'number',
        value: (a ** m - a ** (n + 1)) / (1 - a),
    })
})
