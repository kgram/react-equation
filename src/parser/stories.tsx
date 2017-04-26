import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import classes from '../stories.scss'
import '../style.scss'

import { resolve, buildResolver} from '../resolver'
import { VariableLookup, FunctionLookup } from '../types'

import { EquationTree } from '../types'

import EquationWrapper from '../equation-wrapper.stories'

import { parse, showTree, stringify } from '.'

function getPersistantState(): string {
    return window.localStorage.persistantEquationState || ''
}

function setPersistantState(state: string) {
    window.localStorage.persistantEquationState = state
}

function Code({children}: {children?: JSX.Element}) {
    return <div><pre className={classes.equationWrapperRaw}>{children}</pre></div>
}

function Math({children = []}: {children?: string[]}) {
    const variableLookup: VariableLookup = {}
    const functionLookup: FunctionLookup = {}
    const equations = children.map((input) => {
        let tree: EquationTree | null = null
        let parseError
        try {
            tree = parse(input)
        } catch (err) {
            parseError = err.message
        }
        // Attempt to resolve to get error
        // EquationWrapper will silently ignore error, but here we want it
        let resolveError
        if (tree) {
            try {
                if (
                    tree.type === 'comparison' &&
                    tree.comparison === '=' &&
                    tree.a.type === 'variable'
                ) {
                    variableLookup[tree.a.name] = resolve(tree.b, variableLookup, functionLookup)
                } else if (
                    tree.type === 'comparison' &&
                    tree.comparison === '=' &&
                    tree.a.type === 'function' &&
                    tree.a.args.every((arg) => arg.type === 'variable')
                ) {
                    const { name, args } = tree.a
                    functionLookup[name] = buildResolver(args.map((arg) => (arg as any).name), tree.b, variableLookup, functionLookup)
                } else {
                    resolve(tree, variableLookup, functionLookup)
                }

            } catch (err) {
                resolveError = err.message.replace('Equation resolve: ', '')
            }
        }

        return {
            input,
            variables: { ...variableLookup },
            functions: { ...functionLookup },
            tree,
            parseError,
            resolveError,
        }
    })

    return (
        <div>
            <div>
                {equations.map(({ input, variables, functions }, idx) => (
                    <EquationWrapper
                        key={idx}
                        input={false}
                        variables={variables}
                        functions={functions}
                    >{input}</EquationWrapper>
                ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {equations.map(({ tree, parseError, resolveError }, idx) => (
                    <div key={idx}>
                        {resolveError && <Code>{resolveError}</Code>}
                        {tree
                            ? <Code>{showTree(tree)}</Code>
                            : <Code>{parseError}</Code>
                        }
                        {tree && <Code>{stringify(tree)}</Code>}
                    </div>
                ))}
            </div>
        </div>
    )
}

class Editor extends React.Component<null, {value: string}> {
    constructor(props: null) {
        super(props)
        this.state = {
            value: getPersistantState(),
        }
    }

    handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        this.setState({ value })
        setPersistantState(value)
    }

    render() {
        const equations = this.state.value.split(/\n/g).map((s) => s.trim()).filter((s) => s)
        return (
            <div>
                <div>
                    <textarea
                        className={classes.equationWrapperRaw}
                        onInput={this.handleChange}
                        value={this.state.value}
                    />
                </div>
                <Math>{equations}</Math>
            </div>
        )
    }
}

storiesOf('Parser', module)
    .add('REPL', () => (
        <Editor />
    ))
