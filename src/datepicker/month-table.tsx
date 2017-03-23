import * as React from 'react'
import * as moment from 'moment'

import classes from './style.scss'

interface IProps {
    date: moment.Moment,
    getCellProps: (date: moment.Moment) => React.HTMLAttributes<HTMLTableDataCellElement>
}

function weekRange(date: moment.Moment, skipWeeks: number): moment.Moment[] {
    const result = new Array(7)
    for (let i = 0; i < 7; i++) {
        result[i] = date.clone().add(skipWeeks * 7 + i, 'days')
    }
    return result
}

function monthRange(date: moment.Moment): moment.Moment[][] {
    const start = date
        .clone()
        .startOf('month')
        .subtract(1, 'day')
        .startOf('week')

    const result = new Array(6)

    for (let i = 0; i < 6; i++) {
        result[i] = weekRange(start, i)
    }

    return result
}

export default function MonthTable({date, getCellProps}: IProps) {
    const month = monthRange(date)
    return (
        <table className={classes.pickerTable}>
            <thead>
                <tr>
                    {moment.weekdaysShort().map((weekday) => <th key={weekday}>{weekday}</th>)}
                </tr>
            </thead>
            <tbody>
                {month.map((week, idx) => (
                    <tr key={week[0].valueOf()}>
                        {week.map((day) => (
                            <td {...getCellProps(day)} key={day.valueOf()}>
                                {day.date()}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
