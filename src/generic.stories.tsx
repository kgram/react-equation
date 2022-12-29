import * as React from 'react'

import { defaultVariables, defaultFunctions } from 'equation-resolver'

import {
    EquationContext,
    EquationEvaluate,
    EquationOptions,
    defaultErrorHandler,
} from '.'

function getPersistantState(): string {
    return window.localStorage.persistantEquationState || ''
}

function setPersistantState(state: string) {
    window.localStorage.persistantEquationState = state
}

class EditorComponent extends React.Component<{}, {value: string, largeSize: boolean}> {
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
        const { largeSize } = this.state
        const equations = this.state.value.split(/\n/g).map((s) => s.trim()).filter((s) => s)
        return (
            <EquationOptions
                variables={defaultVariables}
                functions={defaultFunctions}
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
                    <EquationContext
                        render={(renderEquation) => (
                            <div style={{ fontSize: largeSize ? '300%' : '100%' }}>
                                {equations.map((equation, idx) => (
                                    <div key={idx}>
                                        <div className='equation-wrapper'>
                                            {renderEquation(equation)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </div>
            </EquationOptions>
        )
    }
}

export default {
    title: 'Misc',
    component: EditorComponent,
}

export const Editor = () => (
    <EditorComponent />
)

export const AllVariables = () => (
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
)

