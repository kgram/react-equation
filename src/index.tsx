import renderInternal from './render'

import { EquationNode } from './types'

export function render(tree: EquationNode) {
    return renderInternal(tree)
}
