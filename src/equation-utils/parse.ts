import { Parser } from 'nearley'

import grammar from './math.ne'

import EquationTree, { treeToString } from './equation-tree'

export default function Parse(input: string) {
    const parser = new Parser<EquationTree>(grammar.ParserRules, grammar.ParserStart)
    const result = parser.feed(input)

    switch (result.results.length) {
        case 1:
            return result.results[0]
        case 0:
            throw new Error('Parse math: invalid input')
        default:
            result.results.map((tree) => console.log(treeToString(tree), tree))
            throw new Error('Parse math: ambiguous result')
    }
}
