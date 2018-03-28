import { parse } from '../../src/parser'

 import toVariable from '../helpers/toVariable'

test('single argument', () => {
    expect(parse('f(x)')).toEqual({
        type: 'function',
        name: 'f',
        args: [toVariable('x')],
    })
    expect(parse('f2(x)')).toEqual({
        type: 'function',
        name: 'f2',
        args: [toVariable('x')],
    })
    expect(parse('f_2(x)')).toEqual({
        type: 'function',
        name: 'f_2',
        args: [toVariable('x')],
    })
    expect(parse('%(x)')).toEqual({
        type: 'function',
        name: '%',
        args: [toVariable('x')],
    })
})

test('multiple arguments', () => {
    expect(parse('f(x,y,z)')).toEqual({
        type: 'function',
        name: 'f',
        args: [toVariable('x'),toVariable('y'),toVariable('z')],
    })
})

test('spacing', () => {
    expect(parse('f( x )')).toEqual({
        type: 'function',
        name: 'f',
        args: [toVariable('x')],
    })
    expect(parse('f(     x     ,    y    )')).toEqual({
        type: 'function',
        name: 'f',
        args: [toVariable('x'), toVariable('y')],
    })
    // Spacing is implicit multiplication
    expect(parse('f (x)')).toEqual({
        type: 'operator',
        operator: ' ',
        a: toVariable('f'),
        b: {
            type: 'block',
            child: toVariable('x'),
        },
    })
})
