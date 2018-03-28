import { resolve } from '../../src/resolver'
import { ResultTreeNumber } from '../../src/types'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('defined', () => {
    const variable: ResultTreeNumber = { type: 'number', value: 5 }
    expect(resolve({ type: 'variable', name: 'a' }, { 'a': variable })).toEqual(variable)
})

test('undefined', () => {
    expect(() => resolve({ type: 'variable', name: 'a' })).toThrow()
})
