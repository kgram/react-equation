import { ResultTree, ResultTreeNumber, ResultTreeMatrix, Operator } from '../types'

import valueWrap from './value-wrap'
import mapMatrix from './map-matrix'
import negate from './negate'

function plus(a: ResultTree, b: ResultTree): ResultTree {
    switch (a.type) {
        case 'number':
            switch (b.type) {
                case 'number':
                    return valueWrap(a.value + b.value)
                case 'matrix':
                    return mapMatrix(b, (cell) => plus(a, cell) as ResultTreeNumber)
            }
            break

        case 'matrix': {
            switch (b.type) {
                case 'number':
                    return mapMatrix(a, (cell) => plus(cell, b) as ResultTreeNumber)
                case 'matrix':
                    if (a.n !== b.n || a.m !== b.m) {
                        throw new Error(`Equation resolve: cannot add ${a.m}x${a.n} matrix to ${b.m}x${b.n} matrix`)
                    }
                    return {
                        type: 'matrix',
                        m: a.m,
                        n: a.n,
                        values: a.values.map(
                            (row, rowIdx) => row.map(
                                (cell, cellIdx) => plus(cell, b.values[rowIdx][cellIdx]) as ResultTreeNumber,
                            )
                        ),
                    }
            }
            break
        }
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
    switch (a.type) {
        case 'number':
            switch (b.type) {
                case 'number':
                    return valueWrap(a.value * b.value)
                case 'matrix':
                    return mapMatrix(b, (cell) => multiply(a, cell) as ResultTreeNumber)
            }
            break

        case 'matrix': {
            switch (b.type) {
                case 'number':
                    return mapMatrix(a, (cell) => multiply(cell, b) as ResultTreeNumber)
                case 'matrix':
                    if (a.n === 1 && b.n === 1) {
                        return scalarProduct(a, b)
                    } else {
                        return matrixProduct(a, b)
                    }
            }
            break
        }
    }
    throw new Error(`Equation resolve: cannot handle operator`)
}

function scalarProduct(a: ResultTreeMatrix, b: ResultTreeMatrix): ResultTreeNumber {
    if (a.m !== b.m) {
        throw new Error(`Equation resolve: scalar product requires balanced vectors`)
    }
    const sum = a.values.reduce(
        (current, row, rowIdx) => current + row[0].value * b.values[rowIdx][0].value,
        0,
    )

    return valueWrap(sum)
}

function matrixProduct(a: ResultTreeMatrix, b: ResultTreeMatrix): ResultTreeMatrix {
    if (a.n !== b.m) {
        throw new Error(`Equation resolve: cannot multiply ${a.m}x${a.n} matrix with ${b.m}x${b.n} matrix`)
    }

    return {
        type: 'matrix',
        m: a.m,
        n: b.n,
        values: a.values.map(
            (row, aRow) => b.values[0].map(
                (cell, bCol) => valueWrap(a.values[aRow].reduce(
                    (current, cell, colIdx) => current + cell.value * b.values[colIdx][bCol].value,
                    0,
                )),
            ),
        ),
    }
}

function multiplyImplied(a: ResultTree, b: ResultTree): ResultTree {
    if (a.type === 'matrix' && b.type === 'matrix' && a.n === 1 && b.n === 1) {
        throw new Error(`Equation resolve: cannot use implied multiplication for scalar product`)
    }
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
        case 'matrix':
            return mapMatrix(a, (cell) => valueWrap(cell.value / b.value))
    }
}

function power(a: ResultTree, b: ResultTree): ResultTree {
    if (b.type !== 'number') {
        throw new Error(`Equation resolve: exponent must be a number`)
    }
    switch (a.type) {
        case 'number':
            return valueWrap(Math.pow(a.value, b.value))
        case 'matrix':
            return mapMatrix(a, (cell) => valueWrap(Math.pow(cell.value, b.value)))
    }
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
