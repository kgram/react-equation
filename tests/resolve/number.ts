import { resolve } from '../../src/resolver'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('integer', () => {
    expect(resolve(toNumber(5))).toEqual({
        type: 'number',
        value: 5,
    })
})

test('decimal', () => {
    expect(resolve(toNumber(5.5))).toEqual({
        type: 'number',
        value: 5.5,
    })
})
