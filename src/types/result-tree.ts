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

export type ResultTree =
    ResultTreeNumber |
    ResultTreeMatrix
