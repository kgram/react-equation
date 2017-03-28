import renderInternal from './render'

import { EquationTree, EquationTreeOperator, EquationTreeFunction, Rendering, RenderingPart } from '../types'

export function render(tree: EquationTree) {
    return renderInternal(tree)
}
