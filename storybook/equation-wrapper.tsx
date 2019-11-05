import React, { useState } from 'react'

import Equation from '../src/equation'

type Props = {
    value: string,
}

export const EquationWrapper = ({ value }: Props) => {
    const [isLargeSize, setLargeSize] = useState(false)

    return (
        <div>
            <div className='size-control'>
                <label>
                    <input
                        type='checkbox'
                        checked={isLargeSize}
                        onChange={(event) => setLargeSize(event.currentTarget.checked)}
                    />
                    3x font
                </label>
            </div>
            <div><pre className='equation-wrapper-raw'>{value}</pre></div>
            <div className='equation-wrapper' style={{ fontSize: isLargeSize ? '300%' : '100%' }}>
                <Equation value={value} evaluate />
            </div>
        </div>
    )
}
