import { parse } from '../../src/parser'
import { Operator } from '../../src/types'

import toVariable from '../helpers/toVariable'
import toNumber from '../helpers/toNumber'

function runTest(operator: Operator) {
    // Two numbers, no space
    expect(parse(`3${operator}2`)).toEqual({
        type: 'operator',
        operator,
        a: toNumber(3),
        b: toNumber(2),
    })
    // Number, variable, spaces
    expect(parse(`x ${operator} 1000`)).toEqual({
        type: 'operator',
        operator,
        a: toVariable('x'),
        b: toNumber(1000),
    })
}

describe('operators', () => {
    test('plus', () => {
        runTest('+')
    })

    test('minus', () => {
        runTest('-')
    })

    test('plus-minus', () => {
        runTest('±')
    })

    test('multiplication', () => {
        runTest('*')
    })

    test('multiplication (implied)', () => {
        runTest(' ')
    })

    test('division', () => {
        runTest('/')
    })

    test('division (inline)', () => {
        runTest('÷')
    })

    test('exponentiation', () => {
        runTest('^')
    })
})
