import UnitLookup from './unit-lookup'

export type ResultTreeNumber = {
    type: 'number',
    value: number,
}

export type ResultTreeMatrix = {
    type: 'matrix',
    n: number,
    m: number,
    values: ResultTreeNumber[][],
}

export type ResultTreeUnit = {
    type: 'unit',
    units: UnitLookup,
    value: ResultTreeMatrix | ResultTreeNumber,
}

export type ResultTree =
    ResultTreeNumber |
    ResultTreeMatrix |
    ResultTreeUnit
