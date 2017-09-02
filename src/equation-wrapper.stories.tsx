import * as React from 'react'
import classes from './stories.scss'
import { Renderable } from '@storybook/react'

import { VariableLookup, FunctionLookup } from './types'

type Props = {
    children?: Renderable,
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
}

export type State = {
    largeSize: boolean,
}

export default class EquationWrapper extends React.PureComponent<Props, State> {
    state = { largeSize: false }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({largeSize: e.currentTarget.checked})

    render() {
        const { children } = this.props
        const child = React.Children.only(children)
        const text = child && child.props.children
        return (
            <div>
                <div className={classes.sizeControl}>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.largeSize}
                            onChange={this.handleChange}
                        />
                        3x font
                    </label>
                </div>
                <div><pre className={classes.equationWrapperRaw}>{text}</pre></div>
                <div className={classes.equationWrapper} style={{ fontSize: this.state.largeSize ? '300%' : '100%' }}>
                    {children}
                </div>
            </div>
        )
    }
}
