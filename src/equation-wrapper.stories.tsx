import * as React from 'react'
import classes from './stories.scss'

import { VariableLookup, FunctionLookup } from './resolver'

import Equation from './equation'

type Props = {
    children?: string,
    input?: boolean,
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
}

type State = {
    largeSize: boolean,
}

export default class EquationWrapper extends React.PureComponent<Props, State> {
    state = { largeSize: false }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({largeSize: e.currentTarget.checked})

    render() {
        const { children, input = true, evaluate = true, variables, functions } = this.props
        return (
            <div>
                {input && <div><pre className={classes.equationWrapperRaw}>{children}</pre></div>}
                <div className={classes.equationWrapper}>
                    <input
                        type='checkbox'
                        className={classes.equationWrapperSizeControl}
                        checked={this.state.largeSize}
                        onChange={this.handleChange}
                    />
                    <Equation style={{ fontSize: this.state.largeSize ? '300%' : '100%' }} evaluate={evaluate} variables={variables} functions={functions}>{children}</Equation>
                </div>
            </div>
        )
    }
}
