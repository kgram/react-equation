import { ResultTree, ResultTreeNumber, ResultTreeMatrix, ResultTreeUnit, UnitLookup, Operator } from '../types'

import { getUnit, getUnitless, isEmptyUnit, isSameUnit, mapUnit, combineUnits } from './unit-utils'

import valueWrap from './value-wrap'
import mapMatrix from './map-matrix'
import negate from './negate'

export function plus(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function plus(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function plus(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function plus(aTree: ResultTreeNumber, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function plus(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function plus(aTree: ResultTreeMatrix, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function plus(aTree: ResultTreeNumber | ResultTreeMatrix, bTree: ResultTreeNumber | ResultTreeMatrix): ResultTreeNumber | ResultTreeMatrix;
export function plus(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function plus(aTree: ResultTree, bTree: ResultTree): ResultTree {
    return handleCases(aTree, bTree,
        (a, b) => {
            if (!isSameUnit(a, b)) {
                throw new Error(`Equation resolve: cannot add different units`)
            }
            return a
        },
        // number, number
        (a, b) => valueWrap(a.value + b.value),
        // number, matrix
        (a, b) => mapMatrix(b, (cell) => plus(a, cell)),
        // matrix, number
        (a, b) => mapMatrix(a, (cell) => plus(cell, b)),
        // matrix, matrix
        (a, b) => {
            if (a.n !== b.n || a.m !== b.m) {
                throw new Error(`Equation resolve: cannot add ${a.m}x${a.n} matrix to ${b.m}x${b.n} matrix`)
            }
            return {
                type: 'matrix',
                m: a.m,
                n: a.n,
                values: a.values.map(
                    (row, rowIdx) => row.map(
                        (cell, cellIdx) => plus(cell, b.values[rowIdx][cellIdx]),
                    ),
                ),
            }
        },
    )
}

export function minus(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function minus(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function minus(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function minus(aTree: ResultTreeNumber, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function minus(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function minus(aTree: ResultTreeMatrix, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function minus(aTree: ResultTreeNumber | ResultTreeMatrix, bTree: ResultTreeNumber | ResultTreeMatrix): ResultTreeNumber | ResultTreeMatrix;
export function minus(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function minus(a: ResultTree, b: ResultTree): ResultTree {
    return plus(a, negate(b))
}

export function plusminus(a: ResultTree, b: ResultTree): ResultTree {
    throw new Error('Equation resolve: cannot handle ± operator')
}

export function multiply(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function multiply(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function multiply(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function multiply(aTree: ResultTreeNumber, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function multiply(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function multiply(aTree: ResultTreeMatrix, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function multiply(aTree: ResultTreeNumber | ResultTreeMatrix, bTree: ResultTreeNumber | ResultTreeMatrix): ResultTreeNumber | ResultTreeMatrix;
export function multiply(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function multiply(aTree: ResultTree, bTree: ResultTree): ResultTree {
    return handleCases(aTree, bTree,
        (a, b) => combineUnits(a, b, (unit1, unit2) => unit1 + unit2),
        // number, number
        (a, b) => valueWrap(a.value * b.value),
        // number, matrix
        (a, b) => mapMatrix(b, (cell) => multiply(a, cell)),
        // matrix, number
        (a, b) => mapMatrix(a, (cell) => multiply(cell, b)),
        // matrix, matrix
        (a, b) => {
            if (a.n === 1 && b.n === 1) {
                return scalarProduct(a, b)
            } else {
                return matrixProduct(a, b)
            }
        },
    )
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
                    (current, innerCell, colIdx) => current + innerCell.value * b.values[colIdx][bCol].value,
                    0,
                )),
            ),
        ),
    }
}

export function multiplyImplied(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function multiplyImplied(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function multiplyImplied(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function multiplyImplied(aTree: ResultTreeNumber, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function multiplyImplied(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function multiplyImplied(aTree: ResultTreeMatrix, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function multiplyImplied(aTree: ResultTreeNumber | ResultTreeMatrix, bTree: ResultTreeNumber | ResultTreeMatrix): ResultTreeNumber | ResultTreeMatrix;
export function multiplyImplied(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function multiplyImplied(a: ResultTree, b: ResultTree): ResultTree {
    if (a.type === 'matrix' && b.type === 'matrix' && a.n === 1 && b.n === 1) {
        throw new Error(`Equation resolve: cannot use implied multiplication for scalar product`)
    }
    return multiply(a, b)
}

export function divide(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function divide(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function divide(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function divide(aTree: ResultTreeNumber, bTree: ResultTreeMatrix): ResultTreeMatrix;
export function divide(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function divide(aTree: ResultTreeNumber | ResultTreeMatrix, bTree: ResultTreeNumber | ResultTreeMatrix): ResultTreeNumber | ResultTreeMatrix;
export function divide(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function divide(aTree: ResultTree, bTree: ResultTree): ResultTree {
    if (bTree.type === 'number' && bTree.value === 0) {
        throw new Error(`Equation resolve: cannot divide by 0`)
    }
    return handleCases(aTree, bTree,
        (a, b) => combineUnits(a, b, (factor1, factor2) => factor1 - factor2),
        // number, number
        (a, b) => valueWrap(a.value / b.value),
        // number, matrix
        (a, b) => mapMatrix(b, (cell) => divide(a, cell)),
        // matrix, number
        (a, b) => mapMatrix(a, (cell) => divide(cell, b)),
        // matrix, matrix
        null,
    )
}

export function power(aTree: ResultTreeUnit, bTree: ResultTree): ResultTreeUnit;
export function power(aTree: ResultTree, bTree: ResultTreeUnit): ResultTreeUnit;
export function power(aTree: ResultTreeNumber, bTree: ResultTreeNumber): ResultTreeNumber;
export function power(aTree: ResultTreeMatrix, bTree: ResultTreeNumber): ResultTreeMatrix;
export function power(aTree: ResultTree, bTree: ResultTree): ResultTree;
export function power(aTree: ResultTree, bTree: ResultTree): ResultTree {
    if (bTree.type === 'unit') {
        throw new Error(`Equation resolve: exponent must be unitless`)
    }
    if (bTree.type !== 'number') {
        throw new Error(`Equation resolve: exponent must be a number`)
    }
    return handleCases(aTree, bTree,
        (a) => mapUnit(a, (factor) => factor * bTree.value),
        // number, number
        (a, b) => valueWrap(Math.pow(a.value, b.value)),
        // number, matrix
        null,
        // matrix, number
        (a, b) => mapMatrix(a, (cell) => valueWrap(Math.pow(cell.value, b.value))),
        // matrix, matrix
        null,
    )
}

function handleCases(
    a: ResultTree,
    b: ResultTree,
    combineUnits: (a: UnitLookup, b: UnitLookup) => UnitLookup,
    numberNumber: ((a: ResultTreeNumber, b: ResultTreeNumber) => ResultTreeNumber | ResultTreeMatrix) | null,
    numberMatrix: ((a: ResultTreeNumber, b: ResultTreeMatrix) => ResultTreeNumber | ResultTreeMatrix) | null,
    matrixNumber: ((a: ResultTreeMatrix, b: ResultTreeNumber) => ResultTreeNumber | ResultTreeMatrix) | null,
    matrixMatrix: ((a: ResultTreeMatrix, b: ResultTreeMatrix) => ResultTreeNumber | ResultTreeMatrix) | null,
): ResultTree {
    if (a.type === 'unit' || b.type === 'unit') {
        const units = combineUnits(getUnit(a), getUnit(b))

        const result = handleCases(
            getUnitless(a),
            getUnitless(b),
            combineUnits,
            numberNumber,
            numberMatrix,
            matrixNumber,
            matrixMatrix,
        ) as ResultTreeNumber | ResultTreeMatrix

        if (isEmptyUnit(units)) {
            return result
        } else {
            return {
                type: 'unit',
                units,
                value: result,
            }
        }
    }
    switch (a.type) {
        case 'number':
            switch (b.type) {
                case 'number':
                    if (numberNumber) {
                        return numberNumber(a, b)
                    }
                    break
                case 'matrix':
                    if (numberMatrix) {
                        return numberMatrix(a, b)
                    }
                    break
            }
            break

        case 'matrix': {
            switch (b.type) {
                case 'number':
                    if (matrixNumber) {
                        return matrixNumber(a, b)
                    }
                    break
                case 'matrix':
                    if (matrixMatrix) {
                        return matrixMatrix(a, b)
                    }
                    break
            }
            break
        }
    }
    throw new Error(`Equation resolve: cannot handle operator`)
}

const operators: { [key in Operator]: (a: ResultTree, b: ResultTree) => ResultTree } = {
    '+': plus,
    '-': minus,
    '±': plusminus,
    '*': multiply,
    ' ': multiplyImplied,
    '/': divide,
    '÷': divide,
    '^': power,
}

export default operators
