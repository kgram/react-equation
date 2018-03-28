import { resolve } from '../../src/resolver'

import toNumber from '../helpers/toNumber'

test('infinity', () => {
    expect(resolve({ type: 'infinity' })).toEqual({
        type: 'number',
        value: Infinity,
    })
})
