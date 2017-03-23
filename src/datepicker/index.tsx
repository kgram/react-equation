import * as React from 'react'
import * as moment from 'moment'

import Picker from './picker'

interface IProps {
    value: moment.Moment | null,
    format: string,

    max: moment.Moment,
    min: moment.Moment,


    onChange: (value: moment.Moment | null) => void
}

interface IState {
    open?: boolean,
    textValue?: string,
    focused?: boolean,
    view?: moment.Moment,
}

export default class Datepicker extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        value: null,
        format: 'L',
        min: moment([1900, 0, 1]),
        max: moment([2099, 11, 31]),
    }

    state = {
        open: false,
        textValue: this.getTextValue(this.props),
        focused: false,
        view: this.props.value || moment(),
    }

    input: HTMLInputElement | null = null

    // closeTimeout: NodeJS.Timer | number | null = null

    getTextValue(props: IProps) {
        return props.value
            ? props.value.format(props.format)
            : ''
    }

    willReceiveProps(nextProps: IProps, nextState: IState) {
        if (!nextState.focused && +(this.props.value || 0) !== +(nextProps.value || 0)) {
            this.setState({
                textValue: this.getTextValue(nextProps),
            })
        }
    }

    cancelClose = () => {
        console.log('cancelClose')
        // if (this.closeTimeout) {
        //     clearTimeout(this.closeTimeout)
        // }
        if (this.input) {
            this.input.focus()
        }
    }

    handleInputFocus = () => {
        console.log('handleInputFocus')
        this.setState({
            focused: true,
            open: true,
        })
    }

    handleInputBlur = () => {
        console.log('handleInputBlur')
        // this.closeTimeout = setTimeout(() => {
        //     console.log('handleInputBlur timeout')
        //     this.setState({
        //         textValue: this.getTextValue(this.props),
        //         focused: false,
        //         open: false,
        //     })
        // }, 100)
    }

    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        this.setState({ textValue: value })

        if (value === '') {
            this.props.onChange(null)
        } else {
            const parsed = moment(value, this.props.format)
            if (parsed.isValid() && parsed.isAfter(this.props.min) && parsed.isBefore(this.props.max)) {
                this.props.onChange(parsed)
                this.setState({ view: parsed })
            }
        }
    }

    handleSelected = (selected: moment.Moment) => {
        this.props.onChange(selected)
        this.setState({  view: selected })
    }

    handleViewChange = (view: moment.Moment) => {
        this.setState({ view })
    }

    render() {
        const { value, format, onChange } = this.props
        const { open, textValue, view } = this.state
        return (
            <div>
                <input
                    ref={(el) => this.input = el}
                    value={textValue}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    onChange={this.handleInputChange}
                />
                {open
                    ? <Picker
                        view={view}
                        selected={value}
                        onViewChange={this.handleViewChange}
                        onSelected={this.handleSelected}
                        keepFocus={this.cancelClose}
                    />
                    : null
                }
            </div>
        )
    }
}