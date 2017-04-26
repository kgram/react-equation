import { parse } from '../../src/parser'

import { buildNumber, buildVariable } from '../../src/helpers'

describe('operands', () => {
    test('parses integers', () => {
        expect(parse('1')).toEqual(buildNumber(1))
        expect(parse('123456')).toEqual(buildNumber(123456))
    })

    test('parses floats', () => {
        expect(parse('0.5')).toEqual(buildNumber(0.5))
        expect(parse('123.456')).toEqual(buildNumber(123.456))
    })

    test('rejects invalid number formats', () => {
        expect(() => parse('.5')).toThrow()
        expect(() => parse('2e5')).toThrow()
    })

    test('parses variables', () => {
        expect(parse('x')).toEqual(buildVariable('x'))
        expect(parse('x2')).toEqual(buildVariable('x2'))
        expect(parse('x_2')).toEqual(buildVariable('x_2'))
        expect(parse('%')).toEqual(buildVariable('%'))
        expect(parse('x_x_x_x_x_x')).toEqual(buildVariable('x_x_x_x_x_x'))
    })

    test('rejects invalid variables', () => {
        expect(() => parse('2x')).toThrow()
    })
})