import { EquationTree } from '../types'
import throwUnknownType from '../throw-unknown-type'

export default function stringify(tree: EquationTree) {
    return stringifyTree(tree).join('')
}

function stringifyTree(tree: EquationTree, buffer: string[] = []) {
    switch (tree.type) {
        case 'number':
            buffer.push(tree.value.toString())
            break
        case 'infinity':
            buffer.push('∞')
            break
        case 'variable':
            buffer.push(tree.name)
            break
        case 'negative':
            buffer.push('-')
            stringifyTree(tree.value, buffer)
            break
        case 'plusminus':
            buffer.push('±')
            stringifyTree(tree.value, buffer)
            break
        case 'block':
            buffer.push('(')
            stringifyTree(tree.child, buffer)
            buffer.push(')')
            break
        case 'operator':
            stringifyTree(tree.a, buffer)
            buffer.push(tree.operator)
            stringifyTree(tree.b, buffer)
            break
        case 'function':
            buffer.push(tree.name)
            buffer.push('(')
            tree.args.forEach((arg, idx) => {
                if (idx > 0) {
                    buffer.push(',')
                }
                stringifyTree(arg, buffer)
            })
            buffer.push(')')
            break
        case 'comparison':
            stringifyTree(tree.a, buffer)
            buffer.push(tree.comparison)
            stringifyTree(tree.b, buffer)
            break
        case 'matrix':
            buffer.push('[')
            tree.values.forEach((row, rowIdx) => {
                if (tree.n > 1) {
                    buffer.push('[')
                } else if (rowIdx > 0) {
                    buffer.push(',')
                }
                row.forEach((cell, cellIdx) => {
                    if (cellIdx > 0) {
                        buffer.push(',')
                    }
                    stringifyTree(cell, buffer)
                })
                if (tree.n > 1) {
                    buffer.push(']')
                }
            })
            buffer.push(']')
            break
        default:
            throwUnknownType(tree, (type) => `Equation tree to string: cannot resolve type "${type}"`)
    }

    return buffer
}
