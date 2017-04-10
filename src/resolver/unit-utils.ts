import { ResultTree, UnitLookup } from '../types'

export function getUnit(x: ResultTree): UnitLookup {
    if (x.type === 'unit') {
        return x.units
    } else {
        return {}
    }
}

export function getUnitless(x: ResultTree) {
    if (x.type === 'unit') {
        return x.value
    } else {
        return x
    }
}

export function isSameUnit(a: UnitLookup, b: UnitLookup) {
    const keys = Object.keys(a)

    return keys.length === Object.keys(b).length &&
        keys.every((key) => a[key] === b[key])
}

export function isEmptyUnit(x: UnitLookup) {
    return Object.keys(x).length === 0
}

export function combineUnits(
    a: UnitLookup,
    b: UnitLookup,
    mapper: (a: number, b: number, key: string) => number,
): UnitLookup {
    // Get all units from a
    const result = mapUnit(a, (value, key) => {
        return mapper(value, b[key] || 0, key)
    })
    // Get remaining units from b
    for (const [key, value] of Object.entries(b)) {
        if (key in a) { continue }
        const newValue = mapper(0, value, key)
        if (newValue !== 0) {
            result[key] = newValue
        }
    }

    return result
}

export function mapUnit(x: UnitLookup, mapper: (value: number, key: string) => number) {
    const result: UnitLookup = {}
    for (const [key, value] of Object.entries(x)) {
        const newValue = mapper(value, key)
        if (newValue !== 0) {
            result[key] = newValue
        }
    }

    return result
}