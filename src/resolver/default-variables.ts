import { VariableLookup } from '../types'
import valueWrap from './value-wrap'

const defaultVariables: VariableLookup = {
    e: valueWrap(Math.E),
    pi: valueWrap(Math.PI),
    π: valueWrap(Math.PI),
}

export default defaultVariables
