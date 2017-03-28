import { EquationTree } from '../types'

export default function showTree(tree: EquationTree) {
    return pushTree(tree).join('\n')
}

function pushTree(tree: EquationTree, buffer: string[] = [], ownIndent = '', descendantIndent = '') {
    switch (tree.type) {
        case 'number':
            buffer.push(ownIndent + tree.value)
            break
        case 'variable':
            buffer.push(`${ownIndent}"${tree.name}"`)
            break
        case 'negative':
            buffer.push(`${ownIndent}-`)
            pushTree(tree.value, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'plusminus':
            buffer.push(`${ownIndent}±`)
            pushTree(tree.value, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'block':
            buffer.push(`${ownIndent}()`)
            pushTree(tree.child, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'operator':
            buffer.push(ownIndent + tree.operator)
            pushTree(tree.a, buffer, descendantIndent + '├─ ', descendantIndent + '│  ')
            pushTree(tree.b, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'function':
            buffer.push(`${ownIndent}${tree.name}()`)
            tree.args.forEach((arg, idx) => {
                if (idx < tree.args.length - 1) {
                    pushTree(arg, buffer, descendantIndent + '├─ ', descendantIndent + '│  ')
                } else {
                    pushTree(arg, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
                }
            })
            break
        case 'equals':
            buffer.push(`${ownIndent}=`)
            pushTree(tree.a, buffer, descendantIndent + '├─ ', descendantIndent + '│  ')
            pushTree(tree.b, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        default:
            // Get around typescripts checks to catch any parsed types we don't handle yet
            const type = (tree as any).type
            throw new Error(`Equation tree to string: cannot resolve type "${type}"`)
    }

    return buffer
}
