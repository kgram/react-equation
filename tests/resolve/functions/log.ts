import { resolve } from '../../../src/resolver'

import toNumber from '../../helpers/toNumber'

import '../../helpers/toAlmostEqual'

test('default base (10)', () => {
    expect(resolve({
        type: 'function',
        name: 'log',
        args: [toNumber(1e7)]
    })).toAlmostEqual({
        type: 'number',
        value: 7,
    })
})

test('specific base', () => {
    expect(resolve({
        type: 'function',
        name: 'log',
        args: [toNumber(8 ** 7), toNumber(8)]
    })).toAlmostEqual({
        type: 'number',
        value: 7,
    })
})
