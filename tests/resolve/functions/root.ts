import { resolve } from '../../../src/resolver'

import toNumber from '../../helpers/toNumber'

import '../../helpers/toAlmostEqual'

test('default', () => {
    expect(resolve({
        type: 'function',
        name: 'root',
        args: [toNumber(3), toNumber(125)]
    })).toAlmostEqual({
        type: 'number',
        value: 5,
    })
})
