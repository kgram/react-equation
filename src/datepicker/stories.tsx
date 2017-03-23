import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Datepicker from '.'

import * as moment from 'moment'

class DatepickerWrapper extends React.PureComponent<any, { value: moment.Moment | null }> {
    state = {
        value: this.props.value || moment(),
    }

    handleChange = (value: moment.Moment) => {
        this.setState({ value })
        action('onChange')(value)
    }

    render() {
        return <Datepicker {...this.props} value={this.state.value} onChange={this.handleChange} />
    }
}

storiesOf('Datepicker', module)
    .add('Default', () => (
        <DatepickerWrapper />
    ))
