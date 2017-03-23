import { Parser } from 'nearley'

import { EquationTree } from '../types'

import showTree from './showTree'
import stringify from './stringify'
import grammar from './math.ne'

export { showTree, stringify }

export function parse(input: string) {
    const parser = new Parser<EquationTree>(grammar.ParserRules, grammar.ParserStart)
    const result = parser.feed(input)

    switch (result.results.length) {
        case 1:
            return result.results[0]
        case 0:
            throw new Error('Parse math: invalid input')
        default:
            result.results.map((tree) => console.log(showTree(tree), tree))
            throw new Error('Parse math: ambiguous result')
    }
}
