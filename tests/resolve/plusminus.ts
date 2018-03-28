import { resolve } from '../../src/resolver'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('any', () => {
    expect(() => resolve({
        type: 'plusminus',
        value: toNumber(5),
    })).toThrow()
})

