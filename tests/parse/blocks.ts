import { parse } from '../../src/parser'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('alone', () => {
    expect(parse('(a)')).toEqual({
        type: 'block',
        child: toVariable('a'),
    })
    expect(parse('( a + 2)')).toEqual({
        type: 'block',
        child: {
            type: 'operator',
            operator: '+',
            a: toVariable('a'),
            b: toNumber(2),
        },
    })
})

test('with operator', () => {
    expect(parse('(a)')).toEqual({
        type: 'block',
        child: toVariable('a'),
    })
    expect(parse('5 *( a + 2)')).toEqual({
        type: 'operator',
        operator: '*',
        a: toNumber(5),
        b: {
            type: 'block',
            child: {
                type: 'operator',
                operator: '+',
                a: toVariable('a'),
                b: toNumber(2),
            },
        },
    })
})


