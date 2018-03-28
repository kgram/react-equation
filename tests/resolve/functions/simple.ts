import { resolve } from '../../../src/resolver'

import toVariable from '../../helpers/toVariable'
import toNumber from '../../helpers/toNumber'

test('sin', () => {
    expect(resolve({
        type: 'function',
        name: 'sin',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.sin(5),
    })
})

test('cos', () => {
    expect(resolve({
        type: 'function',
        name: 'cos',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.cos(5),
    })
})

test('tan', () => {
    expect(resolve({
        type: 'function',
        name: 'tan',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.tan(5),
    })
})

test('asin', () => {
    expect(resolve({
        type: 'function',
        name: 'asin',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.asin(5),
    })
})

test('acos', () => {
    expect(resolve({
        type: 'function',
        name: 'acos',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.acos(5),
    })
})

test('atan', () => {
    expect(resolve({
        type: 'function',
        name: 'atan',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.atan(5),
    })
})

test('atan2', () => {
    expect(resolve({
        type: 'function',
        name: 'atan2',
        args: [toNumber(5), toNumber(2)]
    })).toEqual({
        type: 'number',
        value: Math.atan2(5, 2),
    })
})

test('abs', () => {
    expect(resolve({
        type: 'function',
        name: 'abs',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.abs(5),
    })
})

test('ceil', () => {
    expect(resolve({
        type: 'function',
        name: 'ceil',
        args: [toNumber(5.2)]
    })).toEqual({
        type: 'number',
        value: Math.ceil(5.2),
    })
})

test('floor', () => {
    expect(resolve({
        type: 'function',
        name: 'floor',
        args: [toNumber(5.2)]
    })).toEqual({
        type: 'number',
        value: Math.floor(5.2),
    })
})

test('round', () => {
    expect(resolve({
        type: 'function',
        name: 'round',
        args: [toNumber(5.4)]
    })).toEqual({
        type: 'number',
        value: Math.round(5.4),
    })
})

test('max', () => {
    expect(resolve({
        type: 'function',
        name: 'max',
        args: [toNumber(5), toNumber(2), toNumber(9)]
    })).toEqual({
        type: 'number',
        value: Math.max(5, 2, 9),
    })
})

test('min', () => {
    expect(resolve({
        type: 'function',
        name: 'min',
        args: [toNumber(5), toNumber(2), toNumber(9)]
    })).toEqual({
        type: 'number',
        value: Math.min(5, 2, 9),
    })
})

test('pow', () => {
    expect(resolve({
        type: 'function',
        name: 'pow',
        args: [toNumber(5), toNumber(3)]
    })).toEqual({
        type: 'number',
        value: Math.pow(5, 3),
    })
})

test('sqrt', () => {
    expect(resolve({
        type: 'function',
        name: 'sqrt',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.sqrt(5),
    })
})

test('ln', () => {
    expect(resolve({
        type: 'function',
        name: 'ln',
        args: [toNumber(5)]
    })).toEqual({
        type: 'number',
        value: Math.log(5),
    })
})
