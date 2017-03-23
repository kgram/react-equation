import * as React from 'react'
import { default as moment, Moment } from 'moment'

import Face from './face'
import Hand from './hand'

export default function Clock({
    time,
    color = 'currentColor',
    handColor = 'currentColor',
    backgroundColor = 'white',
    size = 200,
    digits = false,
    tics = false,
    smooth = false,
}: {
    time: Moment,
    color: string,
    handColor: string,
    backgroundColor: string,
    size: number,
    digits: boolean,
    tics: boolean,
    smooth: boolean,
}) {
    const seconds = time.second() + (smooth ? time.millisecond() / 1000 : 0)
    const minutes = time.minute() + seconds / 60
    const hours = time.hour() + minutes / 60
    return (
        <Face
            color={color}
            backgroundColor={backgroundColor}
            size={size}
            border={size * 0.025}
            digits={digits}
            tics={tics}
        >
            <Hand length={size * 0.40} color={handColor} width={size * 0.01} progress={seconds / 60} />
            <Hand length={size * 0.30} color={handColor} width={size * 0.025} progress={minutes / 60} />
            <Hand length={size * 0.2} color={handColor} width={size * 0.04} progress={hours / 12} />
        </Face>
    )
}