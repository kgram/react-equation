// Keep this file as js, since typescript cannot understand jest-extensions

const { isEqual } = require('lodash')

const { parse } = require('../../src/parser')

const toNumber = require('../helpers/toNumber').default

// operator a should come first regardless of order
function toHaveHigherPrecedence(op1, op2) {
    // op1 first
    const op1First = isEqual(parse(`1${op1}2${op2}3`), {
        type: 'operator',
        operator: op1,
        a: toNumber(1),
        b: {
            type: 'operator',
            operator: op2,
            a: toNumber(2),
            b: toNumber(3),
        },
    })
    // b first
    const op2First = isEqual(parse(`1${op2}2${op1}3`), {
        type: 'operator',
        operator: op1,
        a: {
            type: 'operator',
            operator: op2,
            a: toNumber(1),
            b: toNumber(2),
        },
        b: toNumber(3),
    })

    const pass = this.isNot
        ? op1First || op2First
        : op1First && op2First

    return {
        message: () => `expected '${op1}' to${pass ? ' not': ''} have higher precedence than '${op2}'`,
        pass,
    }
}

// Equal precedence, first operator first
function toHaveEqualPrecedence(op1, op2) {
    // a first
    const op1First = isEqual(parse(`1${op1}2${op2}3`), {
        type: 'operator',
        operator: op2,
        a: {
            type: 'operator',
            operator: op1,
            a: toNumber(1),
            b: toNumber(2),
        },
        b: toNumber(3),
    })
    // b first
    const op2First = isEqual(parse(`1${op2}2${op1}3`), {
        type: 'operator',
        operator: op1,
        a: {
            type: 'operator',
            operator: op2,
            a: toNumber(1),
            b: toNumber(2),
        },
        b: toNumber(3),
    })

    const pass = op1First && op2First

    return {
        message: () => `expected '${op1}' to${this.isNot ? ' not': ''} have same precedence as '${op2}'`,
        pass,
    }
}

expect.extend({
    toHaveHigherPrecedence,
    toHaveEqualPrecedence,
})

describe('operator precedence', () => {
    test('plus', () => {
        expect('+').toHaveEqualPrecedence('+')
        expect('+').toHaveEqualPrecedence('-')
        expect('+').toHaveEqualPrecedence('±')

        expect('+').toHaveHigherPrecedence('*')
        expect('+').toHaveHigherPrecedence(' ')
        expect('+').toHaveHigherPrecedence('÷')

        expect('+').toHaveHigherPrecedence('/')

        expect('+').toHaveHigherPrecedence('^')
    })

    test('minus', () => {
        expect('-').toHaveEqualPrecedence('+')
        expect('-').toHaveEqualPrecedence('-')
        expect('-').toHaveEqualPrecedence('±')

        expect('-').toHaveHigherPrecedence('*')
        expect('-').toHaveHigherPrecedence(' ')
        expect('-').toHaveHigherPrecedence('÷')

        expect('-').toHaveHigherPrecedence('/')

        expect('-').toHaveHigherPrecedence('^')
    })

    test('plus-minus', () => {
        expect('±').toHaveEqualPrecedence('+')
        expect('±').toHaveEqualPrecedence('-')
        expect('±').toHaveEqualPrecedence('±')

        expect('±').toHaveHigherPrecedence('*')
        expect('±').toHaveHigherPrecedence(' ')
        expect('±').toHaveHigherPrecedence('÷')

        expect('±').toHaveHigherPrecedence('/')

        expect('±').toHaveHigherPrecedence('^')
    })

    test('multiplication', () => {
        expect('*').not.toHaveHigherPrecedence('+')
        expect('*').not.toHaveHigherPrecedence('-')
        expect('*').not.toHaveHigherPrecedence('±')

        expect('*').toHaveEqualPrecedence('*')
        expect('*').toHaveEqualPrecedence(' ')
        expect('*').toHaveEqualPrecedence('÷')

        expect('*').toHaveHigherPrecedence('/')

        expect('*').toHaveHigherPrecedence('^')
    })

    test('multiplication (implied)', () => {
        expect(' ').not.toHaveHigherPrecedence('+')
        expect(' ').not.toHaveHigherPrecedence('-')
        expect(' ').not.toHaveHigherPrecedence('±')

        expect(' ').toHaveEqualPrecedence('*')
        expect(' ').toHaveEqualPrecedence(' ')
        expect(' ').toHaveEqualPrecedence('÷')

        expect(' ').toHaveHigherPrecedence('/')

        expect(' ').toHaveHigherPrecedence('^')
    })

    test('division (inline)', () => {
        expect('÷').not.toHaveHigherPrecedence('+')
        expect('÷').not.toHaveHigherPrecedence('-')
        expect('÷').not.toHaveHigherPrecedence('±')

        expect('÷').toHaveEqualPrecedence('*')
        expect('÷').toHaveEqualPrecedence(' ')
        expect('÷').toHaveEqualPrecedence('÷')

        expect('÷').toHaveHigherPrecedence('/')

        expect('÷').toHaveHigherPrecedence('^')
    })

    test('division', () => {
        expect('/').not.toHaveHigherPrecedence('+')
        expect('/').not.toHaveHigherPrecedence('-')
        expect('/').not.toHaveHigherPrecedence('±')

        expect('/').not.toHaveHigherPrecedence('*')
        expect('/').not.toHaveHigherPrecedence(' ')
        expect('/').not.toHaveHigherPrecedence('÷')

        expect('/').toHaveEqualPrecedence('/')

        expect('/').toHaveHigherPrecedence('^')
    })

    test('exponentiation', () => {
        expect('^').not.toHaveHigherPrecedence('+')
        expect('^').not.toHaveHigherPrecedence('-')
        expect('^').not.toHaveHigherPrecedence('±')

        expect('^').not.toHaveHigherPrecedence('*')
        expect('^').not.toHaveHigherPrecedence(' ')
        expect('^').not.toHaveHigherPrecedence('÷')

        expect('^').not.toHaveHigherPrecedence('/')

        // Exponentiation does not follow normal rules when chained
        // 1+2+3 is grouped as (1+2)+3 but 1^2^3 has to be grouped as 1^(2^3)
        expect(parse('1^2^3')).toEqual({
            type: 'operator',
            operator: '^',
            a: toNumber(1),
            b: {
                type: 'operator',
                operator: '^',
                a: toNumber(2),
                b: toNumber(3),
            },
        })
    })
})
