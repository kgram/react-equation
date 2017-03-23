import { EquationTree } from '../types'

export default function stringify(tree: EquationTree) {
    return stringifyTree(tree).join('')
}

function stringifyTree(tree: EquationTree, buffer: string[] = []) {
    switch (tree.type) {
        case 'number':
            buffer.push(tree.value.toString())
            break
        case 'variable':
            buffer.push(tree.name)
            break
        case 'negative':
            buffer.push('-')
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
        case 'equals':
            stringifyTree(tree.a, buffer)
            buffer.push('=')
            stringifyTree(tree.b, buffer)
            break
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation tree to string: cannot resolve type "${type}"`)
    }

    return buffer
}
