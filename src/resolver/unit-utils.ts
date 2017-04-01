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