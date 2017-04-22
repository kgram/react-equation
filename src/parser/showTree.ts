import { EquationTree } from '../types'
import throwUnknownType from '../throw-unknown-type'

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
        case 'infinity':
            buffer.push(ownIndent + '∞')
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
        case 'matrix':
            if (tree.n === 1) {
                buffer.push(`${ownIndent}v ${tree.m}`)

                tree.values.forEach((row, idx) => {
                    pushTree(row[0], buffer, descendantIndent, idx < tree.m - 1 ? 'regular' : 'last')
                })
            } else {
                buffer.push(`${ownIndent}m ${tree.m}x${tree.n}`)

                tree.values.forEach((row, rowIdx) => {
                    const rowIndent = descendantIndent + (rowIdx < tree.m - 1 ? '│  ' : '   ')
                    row.forEach((cell, cellIdx) => {
                        if (cellIdx === 0) {
                            if (rowIdx < tree.m - 1) {
                                pushTree(cell, buffer, descendantIndent + '├──┬─ ', 'initial')
                            } else {
                                pushTree(cell, buffer, descendantIndent + '└──┬─ ', 'initial')
                            }
                        } else {
                            pushTree(cell, buffer, rowIndent, cellIdx < tree.n - 1 ? 'regular' : 'last')
                        }
                    })
                })
            }
            break
        default:
            throwUnknownType(tree, (type) => `Equation tree to string: cannot resolve type "${type}"`)
    }

    return buffer
}
