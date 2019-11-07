import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { resolve, createResolverFunction } from 'equation-resolver'
import { parse, EquationNode } from 'equation-parser'
import renderTree from 'equation-parser/dist/renderTree'
import stringify from 'equation-parser/dist/stringify'

import Equation from './equation'

function getPersistantState(): string {
    return window.localStorage.persistantEquationState || ''
}

function setPersistantState(state: string) {
    window.localStorage.persistantEquationState = state
}

function Code({children}: {children?: JSX.Element | string}) {
    return <div><pre className='equation-wrapper-raw'>{children}</pre></div>
}

function Math({children = [], largeSize}: {children?: string[], largeSize: boolean}) {
    const variables: VariableLookup = {}
    const functions: FunctionLookup = {}
    const equations = children.map((input) => {
        const [inputEquation, inputUnit] = input.split(':')

        let tree: EquationNode | null = null
        let unitTree: EquationNode | null = null
        let parseError
        try {
            tree = parse(inputEquation)
            unitTree = inputUnit ? parse(inputUnit) : null
        } catch (err) {
            parseError = err.message
        }
        // Attempt to resolve to get error
        // Equation will silently ignore error, but here we want it
        let resolveError
        if (tree) {
            try {
                if (
                    tree.type === 'equals' &&
                    tree.a.type === 'variable'
                ) {
                    variables[tree.a.name] = resolve(tree.b, { variables, functions })
                } else if (
                    tree.type === 'equals' &&
                    tree.a.type === 'function' &&
                    tree.a.args.every((arg) => arg.type === 'variable')
                ) {
                    const { name, args } = tree.a
                    functions[name] = createResolverFunction(args.map((arg) => (arg as any).name), tree.b, { variables, functions })
                } else {
                    resolve(tree, { variables, functions })
                    if (unitTree) {
                        resolve(unitTree, { variables, functions })
                    }
                }

            } catch (err) {
                resolveError = err.message.replace('Equation resolve: ', '')
            }
        }

        return {
            inputEquation,
            inputUnit,
            variables: { ...variables },
            functions: { ...functions },
            tree,
            parseError,
            resolveError,
        }
    })

    return (
        <div>
            <div style={{ fontSize: largeSize ? '300%' : '100%' }}>
                {equations.map(({ inputEquation, inputUnit, variables, functions }, idx) => (
                    <div key={idx}>
                        <div className='equation-wrapper'>
                            <Equation
                                value={inputEquation}
                                evaluate
                                variables={variables}
                                functions={functions}
                                unit={inputUnit}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {equations.map(({ tree, parseError, resolveError }, idx) => (
                    <div key={idx}>
                        {resolveError && <Code>{resolveError}</Code>}
                        {tree
                            ? <Code>{renderTree(tree)}</Code>
                            : <Code>{parseError}</Code>
                        }
                        {tree && <Code>{stringify(tree)}</Code>}
                    </div>
                ))}
            </div>
        </div>
    )
}

class Editor extends React.Component<{}, {value: string, largeSize: boolean}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: getPersistantState(),
            largeSize: false,
        }
    }

    handleSizeChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({largeSize: e.currentTarget.checked})

    handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        this.setState({ value })
        setPersistantState(value)
    }

    render() {
        const equations = this.state.value.split(/\n/g).map((s) => s.trim()).filter((s) => s)
        return (
            <div>
                <div className='size-control'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.largeSize}
                            onChange={this.handleSizeChange}
                        />
                        3x font
                    </label>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <textarea
                        className='equation-wrapper-raw'
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                    <div style={{ maxWidth: 400 }}>
                        <p>Write equations in plain-text split into lines. Content is kept in localstorage.</p>
                        <p>Below, the equation tree and stringified equation are shown.</p>
                        <p>Common variables and units are available.</p>
                        <p>Variables and functions can be assigned and used later.</p>
                        <p>The output can be evaluated as a specific unit by writing the unit after a colon.</p>
                    </div>
                </div>
                <Math largeSize={this.state.largeSize}>{equations}</Math>
            </div>
        )
    }
}

storiesOf('parser', module)
    .add('Editor', () => (
        <Editor />
    ))
