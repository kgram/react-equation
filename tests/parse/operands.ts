import { parse } from '../../src/parser'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

test('parses integers', () => {
    expect(parse('1')).toEqual(toNumber(1))
    expect(parse('123456')).toEqual(toNumber(123456))
})

test('parses floats', () => {
    expect(parse('0.5')).toEqual(toNumber(0.5))
    expect(parse('123.456')).toEqual(toNumber(123.456))
})

test('rejects invalid number formats', () => {
    expect(() => parse('.5')).toThrow()
    expect(() => parse('2e5')).toThrow()
})

test('parses variables', () => {
    expect(parse('x')).toEqual(toVariable('x'))
    expect(parse('x2')).toEqual(toVariable('x2'))
    expect(parse('x_2')).toEqual(toVariable('x_2'))
    expect(parse('%')).toEqual(toVariable('%'))
    expect(parse('x_x_x_x_x_x')).toEqual(toVariable('x_x_x_x_x_x'))
})

test('rejects invalid variables', () => {
    expect(() => parse('2x')).toThrow()
})
