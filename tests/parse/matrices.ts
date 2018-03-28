import { parse } from '../../src/parser'

 import toVariable from '../helpers/toVariable'

test('vector', () => {
    expect(parse('[a]')).toEqual({
        type: 'matrix',
        n: 1,
        m: 1,
        values: [[toVariable('a')]]
    })
    expect(parse('[a,b,  c  ]')).toEqual({
        type: 'matrix',
        n: 1,
        m: 3,
        values: [[toVariable('a')], [toVariable('b')], [toVariable('c')]]
    })
})

test('vector invalid with nested vector', () => {
    expect(() => parse('[[a], [b], [c]]')).toThrow()
})

test('horizontal vector', () => {
    expect(parse('[[a]]')).toEqual({
        type: 'matrix',
        n: 1,
        m: 1,
        values: [[toVariable('a')]]
    })
    expect(parse('[[a,b,  c  ]]')).toEqual({
        type: 'matrix',
        n: 3,
        m: 1,
        values: [[toVariable('a'), toVariable('b'), toVariable('c')]]
    })
})

test('matrix', () => {
    expect(parse('[   [  a , b , c][d,e,f]]')).toEqual({
        type: 'matrix',
        n: 3,
        m: 2,
        values: [
            [toVariable('a'), toVariable('b'), toVariable('c')],
            [toVariable('d'), toVariable('e'), toVariable('f')],
        ]
    })
})


