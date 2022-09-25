import { EquationNode } from 'equation-parser'

const comparisons = [
    'equals',
    'less-than',
    'greater-than',
    'less-than-equals',
    'greater-than-equals',
    'approximates',
] as const

type Comparisons = typeof comparisons[number]

export const isComparison = (node: EquationNode): node is Extract<EquationNode, { type: Comparisons }> => (
    comparisons.includes(node.type as Comparisons)
)
