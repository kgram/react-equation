import * as React from 'react'
import * as moment from 'moment'
import * as classNames from 'classnames'

import MonthTable from './month-table'
import classes from './style.scss'

interface IProps {
    view: moment.Moment,
    selected: moment.Moment | null,
    onViewChange: (view: moment.Moment) => void,
    onSelected: (selected: moment.Moment) => void,

    keepFocus: () => void,
}

export default class Datepicker extends React.PureComponent<IProps, null> {

    getCellProps = (date: moment.Moment) => {
        const { selected, view, onSelected } = this.props
        return {
            className: classNames({
                [classes.selectedDay]: selected && selected.isSame(date, 'day'),
                [classes.otherMonth]: !view.isSame(date, 'month'),
            }),
            onClick: () => onSelected(date),
        }
    }

    handleNavigate(amount: number, unit: moment.unitOfTime.Base) {
        const { view, onViewChange } = this.props
        onViewChange(view.clone().add(amount, unit))
    }

    render() {
        return (
            <div className={classes.picker} onClick={this.props.keepFocus}>
                <div className={classes.header}>
                    <span onClick={() => this.handleNavigate(-1, 'month')}>&lt;</span>
                    <span>{this.props.view.format('MMMM, YYYY')}</span>
                    <span onClick={() => this.handleNavigate(1, 'month')}>&gt;</span>
                </div>
                <MonthTable date={this.props.view} getCellProps={this.getCellProps} />
            </div>
        )
    }
}
