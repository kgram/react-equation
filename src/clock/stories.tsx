import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Clock from '.'

import * as moment from 'moment'


class ClockWrapper extends React.PureComponent<any, { time: moment.Moment }> {
    state = {
        time: moment(),
    }

    interval: number | null = null

    componentDidMount() {
        this.interval = window.setInterval(() => this.setState({
            time: moment(),
        }), 50)
    }

    componentWillUnmount() {
        if (this.interval !== null) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    render() {
        return <Clock {...this.props} time={this.state.time} />
    }
}

storiesOf('Clock', module)
    .add('Default', () => (
        <ClockWrapper />
    ))
    .add('Numbers', () => (
        <ClockWrapper numbers />
    ))
    .add('Tics', () => (
        <ClockWrapper tics />
    ))
    .add('Numbers and tics', () => (
        <ClockWrapper numbers tics />
    ))
    .add('Sizes', () => (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <ClockWrapper numbers tics size={500} />
            <ClockWrapper numbers tics size={200} />
            <ClockWrapper numbers tics size={100} />
            <ClockWrapper numbers tics size={60} />
            <ClockWrapper numbers tics size={30} />
        </ div>
    ))
    .add('Smooth', () => (
        <ClockWrapper numbers tics smooth />
    ))
