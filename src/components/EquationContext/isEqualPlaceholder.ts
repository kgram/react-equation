import { EquationNode, EquationNodeEquals } from 'equation-parser'
import { EquationNodeMultiplyCross, EquationNodeMultiplyDot, EquationNodeMultiplyImplicit, EquationNodeOperandPlaceholder } from 'equation-parser/dist/EquationNode'

type EquationNodeEqualPlaceholder =
& EquationNodeEquals
& {
    b:
    |EquationNodeOperandPlaceholder
    | (
        & (EquationNodeMultiplyImplicit | EquationNodeMultiplyDot | EquationNodeMultiplyCross)
        & { a: EquationNodeOperandPlaceholder }
    ),
}

export const isEqualPlaceholder = (node: EquationNode): node is EquationNodeEqualPlaceholder => (
    node.type === 'equals' && (
        node.b.type === 'operand-placeholder' || ((
            node.b.type === 'multiply-implicit' ||
            node.b.type === 'multiply-dot' ||
            node.b.type === 'multiply-cross'
        ) && node.b.a.type === 'operand-placeholder')
    )
)
