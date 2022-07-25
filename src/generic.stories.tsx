import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { resolve, createResolverFunction, VariableLookup, FunctionLookup, format, defaultVariables, defaultFunctions } from 'equation-resolver'
import { parse, EquationNodeVariable } from 'equation-parser'

import {
    EquationPreparsed,
    EquationEvaluate,
    EquationOptions,
    useEquationOptions,
    defaultErrorHandler,
} from '.'

const comparisons = [
    'equals',
    'less-than',
    'greater-than',
    'less-than-equals',
    'greater-than-equals',
    'approximates',
]

function getPersistantState(): string {
    return window.localStorage.persistantEquationState || ''
}

function setPersistantState(state: string) {
    window.localStorage.persistantEquationState = state
}

function Math({children = [], largeSize}: {children?: string[], largeSize: boolean}) {
    const variables: VariableLookup = { ...defaultVariables }
    const functions: FunctionLookup = { ...defaultFunctions }
    const options = useEquationOptions()
    const equations = children.map((input) => {
        const [inputEquation, inputUnit] = input.split(':')

        const node = parse(inputEquation)

        if (
            node.type === 'equals' &&
            node.a.type === 'variable'
        ) {
            const value = resolve(node.b, { ...options, variables, functions })
            if (value.type !== 'resolve-error') {
                variables[node.a.name] = value
            }
        } else if (
            node.type === 'equals' &&
            node.a.type === 'function' &&
            node.a.args.every((arg) => arg.type === 'variable')
        ) {
            const { name, args } = node.a
            functions[name] = createResolverFunction(args.map((arg) => (arg as EquationNodeVariable).name), node.b, { variables, functions })
        }

        const formatted = comparisons.includes(node.type)
            ? node
            : format(node, inputUnit ? parse(inputUnit) : null, { ...options, variables, functions })


        return formatted
    })

    return (
        <div>
            <div style={{ fontSize: largeSize ? '300%' : '100%' }}>
                {equations.map((node, idx) => (
                    <div key={idx}>
                        <div className='equation-wrapper'>
                            <EquationPreparsed
                                value={node}
                            />
                        </div>
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
            <EquationOptions
                errorHandler={defaultErrorHandler}
                decimals={{ type: 'max', significantFigures: 14 }}
            >
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
            </EquationOptions>
        )
    }
}

storiesOf('Misc', module)
    .add('Editor', () => (
        <Editor />
    ))
    .add('All variables', () => (
        <div>
            <p>These are all the variables contained in <code>defaultVariables</code> and their evaluation</p>
            {Object.keys(defaultVariables).map((variable) => (
                <div key={variable}>
                    <div className='equation-wrapper'>
                        <EquationEvaluate value={`1 ${variable}`} variables={defaultVariables} functions={defaultFunctions} simplifiableUnits={[]} />
                    </div>
                </div>
            ))}
        </div>
    ))

