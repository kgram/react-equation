import { ResultTree, Operator } from '../types'

import valueWrap from './value-wrap'
import negate from './negate'

function plus(a: ResultTree, b: ResultTree): ResultTree {
    if (a.type === 'number' && b.type === 'number') {
        return valueWrap(a.value + b.value)
    }
    throw new Error(`Equation resolve: cannot handle operator`)
}

function minus(a: ResultTree, b: ResultTree): ResultTree {
    return plus(a, negate(b))
}

function plusminus(a: ResultTree, b: ResultTree): ResultTree {
    throw new Error('Equation resolve: cannot handle ± operator')
}

function multiply(a: ResultTree, b: ResultTree): ResultTree {
    if (a.type === 'number' && b.type === 'number') {
        return valueWrap(a.value * b.value)
    }
    throw new Error(`Equation resolve: cannot handle operator`)
}

function multiplyImplied(a: ResultTree, b: ResultTree): ResultTree {
    return multiply(a, b)
}

function divide(a: ResultTree, b: ResultTree): ResultTree {
    if (b.type !== 'number') {
        throw new Error(`Equation resolve: divisor must be a number`)
    }
    if (b.value === 0) {
        throw new Error(`Equation resolve: cannot divide by 0`)
    }
    switch (a.type) {
        case 'number':
            return valueWrap(a.value / b.value)
    }
}

function power(a: ResultTree, b: ResultTree): ResultTree {
    if (b.type !== 'number') {
        throw new Error(`Equation resolve: exponent must be a number`)
    }
    switch (a.type) {
        case 'number':
            return valueWrap(Math.pow(a.value, b.value))
    }
    throw new Error(`Equation resolve: cannot handle operator`)
}

const operators: { [key in Operator]: (a: ResultTree, b: ResultTree) => ResultTree } = {
    '+': plus,
    '-': minus,
    '±': plusminus,
    '*': multiply,
    '**': multiplyImplied,
    '/': divide,
    '^': power,
}

export default operators
