import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import classes from './stories.scss'
import './style.scss'

import parse from './parse'
import resolve from './resolve'

import EquationWrapper from './equation-wrapper.stories'

import { treeToString, stringify } from './equation-tree'

function getPersistantState(): string {
    return window.localStorage.persistantEquationState || ''
}

function setPersistantState(state: string) {
    window.localStorage.persistantEquationState = state
}

function Code({children}: {children?: JSX.Element}) {
    return <div><pre className={classes.equationWrapperRaw}>{children}</pre></div>
}

function Math({children = ''}: {children?: string}) {
    let tree
    let error

    try {
        tree = parse(children)
    } catch (err) {
        error = err
    }
    // Attempt to resolve to get error
    // EquationWrapper will silently ignore error, but here we want it
    let valueError
    if (tree !== undefined) {
        try {
            resolve(tree)
        } catch (err) {
            valueError = err
        }
    }
    return (
        <div>
            <div>
                <EquationWrapper input={false}>{children}</EquationWrapper>
            </div>
            {valueError && <Code>{valueError.message}</Code>}
            {tree
                ? <Code>{treeToString(tree)}</Code>
                : <Code>{error.message}</Code>
            }
            {tree && <Code>{stringify(tree)}</Code>}
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

    render() {
        return (
            <div>
                <div>
                    <pre
                        className={classes.equationWrapperRaw}
                        contentEditable
                        value={this.state.value}
                        onInput={(e) => {
                            this.setState({value: e.currentTarget.innerText})
                            setPersistantState(e.currentTarget.innerText)
                        }}
                    >{this.state.value}</pre>
                </div>
                <Math>{this.state.value}</Math>
            </div>
        )
    }
}

storiesOf('Equations - Parser', module)
    .add('REPL', () => (
        <Editor />
    ))
