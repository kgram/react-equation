import React, { useState } from 'react'
import { defaultVariables, defaultFunctions } from 'equation-resolver'

import { EquationEvaluate } from '../src/EquationEvaluate'

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
                <EquationEvaluate value={value} variables={defaultVariables} functions={defaultFunctions} />
            </div>
        </div>
    )
}
