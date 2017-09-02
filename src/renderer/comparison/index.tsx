import { RenderingPart, EquationTreeComparison } from '../../types'

import { simplePart } from '../render'

export default function comparison({ comparison }: EquationTreeComparison): RenderingPart {
    return simplePart(comparison, { padding: '0 0.3em' })
}
