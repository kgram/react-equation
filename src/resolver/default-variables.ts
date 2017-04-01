import { VariableLookup, ResultTreeUnit, UnitLookup } from '../types'
import valueWrap from './value-wrap'

const defaultVariables: VariableLookup = {
    e: valueWrap(Math.E),
    pi: valueWrap(Math.PI),
    π: valueWrap(Math.PI),

    m: wrapUnit(1, { m: 1 }),
    km: wrapUnit(1000, { m: 1 }),
    cm: wrapUnit(0.01, { m: 1 }),
    s: wrapUnit(1, { s: 1 }),
}

function wrapUnit(value: number, units: UnitLookup): ResultTreeUnit {
    return {
        type: 'unit',
        units,
        value: valueWrap(value),
    }
}

export default defaultVariables
