import * as React from 'react'
import { default as moment, Moment } from 'moment'

const digitList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Face({size, border, color, backgroundColor, digits = false, tics = false, children }: {
    size: number,
    border: number,
    color: string,
    backgroundColor: string,
    digits?: boolean,
    tics?: boolean,
    children?: JSX.Element,
}) {
    const halfSize = size / 2
    const tickSize = tics ? 0.05 * size : 0
    const fontSize = 0.08 * size
    return (
        <div
            style={{
                width: size,
                height: size,
                color,
                fontSize: size * 0.1,
                fontFamily: 'sans-serif',
                border: `${border}px solid currentColor`,
                borderRadius: '50%',
                position: 'relative',
                backgroundColor,
            }}
        >
            { digits
                ? digitList.map((digit) => (
                        <div
                            key={'number' + digit}
                            style={{
                                position: 'absolute',
                                top: halfSize - Math.cos(digit * Math.PI / 6) * (halfSize - tickSize - fontSize),
                                left: halfSize + Math.sin(digit * Math.PI / 6) * (halfSize - tickSize - fontSize),
                                transform: 'translate(-50%, -50%)',
                            }}
                        >{digit}</div>
                    ))
                : null
            }
            { tics
                ? digitList.map((digit) => (
                        <div
                            key={'tick' + digit}
                            style={{
                                position: 'absolute',
                                width: border * 0.5,
                                height: tickSize,
                                background: color,
                                top: halfSize - Math.cos(digit * Math.PI / 6) * halfSize,
                                left: halfSize + Math.sin(digit * Math.PI / 6) * halfSize,
                                transform: `translate(-50%, 0) rotate(${digit * 30}deg) translate(0, -1px)`,
                                transformOrigin: 'top',
                            }}
                        />
                    ))
                : null
            }
            {children}
        </div>
    )
}