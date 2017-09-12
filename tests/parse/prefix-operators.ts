import { parse } from '../../src/parser'

import { buildNumber } from '../../src/helpers'

test('stand-alone', () => {
    expect(parse('-5')).toEqual(buildNumber(-5))
    expect(parse('±5')).toEqual({
        type: 'plusminus',
        value: buildNumber(5),
    })
})

test('by operators', () => {
    expect(parse('-5-5')).toEqual({
        type: 'operator',
        operator: '-',
        a: buildNumber(-5),
        b: buildNumber(5),
    })
    expect(() => parse('5--5')).toThrow()

    expect(parse('±5-5')).toEqual({
        type: 'operator',
        operator: '-',
        a: {
            type: 'plusminus',
            value: buildNumber(5),
        },
        b: buildNumber(5),
    })
    expect(() => parse('5-±5')).toThrow()
})

test('in block', () => {
    expect(parse('(-5)')).toEqual({
        type: 'block',
        child: buildNumber(-5),
    })
    expect(parse('(±5)')).toEqual({
        type: 'block',
        child: {
            type: 'plusminus',
            value: buildNumber(5),
        },
    })
})