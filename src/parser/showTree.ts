import { EquationTree } from '../types'

export default function showTree(tree: EquationTree) {
    return pushTree(tree).join('\n')
}

function pushTree(tree: EquationTree, buffer: string[] = [], indent: string = '', indentType: 'initial' | 'regular' | 'last' = 'initial') {
    let ownIndent = indent
    let descendantIndent = indent
    switch (indentType) {
        case 'regular':
            ownIndent += '├─ '
            descendantIndent += '│  '
            break
        case 'last':
            ownIndent += '└─ '
            descendantIndent += '   '
            break
    }
    switch (tree.type) {
        case 'number':
            buffer.push(ownIndent + tree.value)
            break
        case 'variable':
            buffer.push(`${ownIndent}"${tree.name}"`)
            break
        case 'negative':
            buffer.push(`${ownIndent}-`)
            pushTree(tree.value, buffer, descendantIndent, 'last')
            break
        case 'plusminus':
            buffer.push(`${ownIndent}±`)
            pushTree(tree.value, buffer, descendantIndent, 'last')
            break
        case 'block':
            buffer.push(`${ownIndent}()`)
            pushTree(tree.child, buffer, descendantIndent, 'last')
            break
        case 'operator':
            buffer.push(ownIndent + tree.operator)
            pushTree(tree.a, buffer, descendantIndent, 'regular')
            pushTree(tree.b, buffer, descendantIndent, 'last')
            break
        case 'function':
            buffer.push(`${ownIndent}${tree.name}()`)
            tree.args.forEach((arg, idx) => {
                pushTree(arg, buffer, descendantIndent, idx < tree.args.length - 1 ? 'regular' : 'last')
            })
            break
        case 'equals':
            buffer.push(`${ownIndent}=`)
            pushTree(tree.a, buffer, descendantIndent, 'regular')
            pushTree(tree.b, buffer, descendantIndent, 'last')
            break
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation tree to string: cannot resolve type "${type}"`)
    }

    return buffer
}
