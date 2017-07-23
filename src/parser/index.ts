import { Parser } from 'nearley'

import { EquationTree } from '../types'

import showTree from './showTree'
import stringify from './stringify'
import { ParserRules, ParserStart } from './math.ne'

export { showTree, stringify }

export function parse(input: string): EquationTree {
    const parser = new Parser<EquationTree>(ParserRules, ParserStart)
    const result = parser.feed(input)

    switch (result.results.length) {
        case 1:
            return result.results[0]
        case 0:
            throw new Error('Parse math: invalid input')
        default:
            throw new Error('Parse math: ambiguous result')
    }
}
