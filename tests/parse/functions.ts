import { parse } from '../../src/parser'

import { buildVariable } from '../../src/helpers'

test('single argument', () => {
    expect(parse('f(x)')).toEqual({
        type: 'function',
        name: 'f',
        args: [buildVariable('x')],
    })
    expect(parse('f2(x)')).toEqual({
        type: 'function',
        name: 'f2',
        args: [buildVariable('x')],
    })
    expect(parse('f_2(x)')).toEqual({
        type: 'function',
        name: 'f_2',
        args: [buildVariable('x')],
    })
    expect(parse('%(x)')).toEqual({
        type: 'function',
        name: '%',
        args: [buildVariable('x')],
    })
})

test('multiple arguments', () => {
    expect(parse('f(x,y,z)')).toEqual({
        type: 'function',
        name: 'f',
        args: [buildVariable('x'),buildVariable('y'),buildVariable('z')],
    })
})

test('spacing', () => {
    expect(parse('f( x )')).toEqual({
        type: 'function',
        name: 'f',
        args: [buildVariable('x')],
    })
    expect(parse('f(     x     ,    y    )')).toEqual({
        type: 'function',
        name: 'f',
        args: [buildVariable('x'), buildVariable('y')],
    })
    // Spacing is implicit multiplication
    expect(parse('f (x)')).toEqual({
        type: 'operator',
        operator: ' ',
        a: buildVariable('f'),
        b: {
            type: 'block',
            child: buildVariable('x'),
        },
    })
})
