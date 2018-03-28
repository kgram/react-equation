import { parse } from '../../src/parser'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('equals (=)', () => {
    expect(parse('a = 10')).toEqual({
        type: 'comparison',
        comparison: '=',
        a: toVariable('a'),
        b: toNumber(10),
    })
})
test('less than (<)', () => {
    expect(parse('a < 10')).toEqual({
        type: 'comparison',
        comparison: '<',
        a: toVariable('a'),
        b: toNumber(10),
    })
})
test('greater than (>)', () => {
    expect(parse('a > 10')).toEqual({
        type: 'comparison',
        comparison: '>',
        a: toVariable('a'),
        b: toNumber(10),
    })
})
test('less than or equal (≤)', () => {
    expect(parse('a ≤ 10')).toEqual({
        type: 'comparison',
        comparison: '≤',
        a: toVariable('a'),
        b: toNumber(10),
    })
})
test('greater than or equal (≥)', () => {
    expect(parse('a ≥ 10')).toEqual({
        type: 'comparison',
        comparison: '≥',
        a: toVariable('a'),
        b: toNumber(10),
    })
})
test('aprox. equal (≈)', () => {
    expect(parse('a ≈ 10')).toEqual({
        type: 'comparison',
        comparison: '≈',
        a: toVariable('a'),
        b: toNumber(10),
    })
})






