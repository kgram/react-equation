export type operator = '+' | '-' | '*' | '**' | '/' | '^'

type EquationTree = {
    type: 'variable',
    name: string,
} | {
    type: 'number',
    value: number,
} | {
    type: 'negative',
    value: EquationTree,
} | {
    type: 'function',
    name: string,
    args: EquationTree[],
} | {
    type: 'block',
    child: EquationTree,
} | {
    type: 'operator',
    operator: operator,
    a: EquationTree,
    b: EquationTree,
} | {
    type: 'equals',
    a: EquationTree,
    b: EquationTree,
}

export default EquationTree

export function treeToString(tree: EquationTree) {
    const buffer: string[] = []
    pushTree(tree, buffer)
    return buffer.join('\n')
}

function pushTree(tree: EquationTree, buffer: string[], ownIndent = '', descendantIndent = '') {
    switch (tree.type) {
        case 'number':
            buffer.push(ownIndent + tree.value)
            break
        case 'variable':
            buffer.push(`${ownIndent}"${tree.name}"`)
            break
        case 'negative':
            buffer.push(`${ownIndent}negative`)
            pushTree(tree.value, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'block':
            buffer.push(ownIndent + 'block')
            pushTree(tree.child, buffer, descendantIndent + '└─ ', descendantIndent + '   ')
            break
        case 'operator':
            buffer.push(`${ownIndent}op ${tree.operator}`)
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
}

export function stringify(tree: EquationTree) {
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
