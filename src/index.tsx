import renderInternal from './render'

import { EquationTree } from './types'

export function render(tree: EquationTree) {
    return renderInternal(tree)
}
