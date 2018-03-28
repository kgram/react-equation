import { parse } from '../../src/parser'

import toNumber from '../helpers/toNumber'

test('stand-alone', () => {
    expect(parse('-5')).toEqual(toNumber(-5))
    expect(parse('±5')).toEqual({
        type: 'plusminus',
        value: toNumber(5),
    })
})

test('by operators', () => {
    expect(parse('-5-5')).toEqual({
        type: 'operator',
        operator: '-',
        a: toNumber(-5),
        b: toNumber(5),
    })
    expect(() => parse('5--5')).toThrow()

    expect(parse('±5-5')).toEqual({
        type: 'operator',
        operator: '-',
        a: {
            type: 'plusminus',
            value: toNumber(5),
        },
        b: toNumber(5),
    })
    expect(() => parse('5-±5')).toThrow()
})

test('in block', () => {
    expect(parse('(-5)')).toEqual({
        type: 'block',
        child: toNumber(-5),
    })
    expect(parse('(±5)')).toEqual({
        type: 'block',
        child: {
            type: 'plusminus',
            value: toNumber(5),
        },
    })
})
