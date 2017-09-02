import { RenderingPart, EquationTreeComparison } from '../../types'

import classes from './styles.scss'

import { simplePart } from '../render'

export default function comparison({ comparison }: EquationTreeComparison): RenderingPart {
    return simplePart(comparison, classes.comparison)
}
