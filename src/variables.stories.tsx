import React from 'react'
import { storiesOf } from '@storybook/react'
import { defaultVariables, defaultFunctions } from 'equation-resolver'

import { EquationEvaluate } from '.'

storiesOf('variable lookup', module)
    .add('All variables', () => (
        <div>
            {Object.keys(defaultVariables).map((variable) => (
                <div key={variable}>
                    <div className='equation-wrapper'>
                        <EquationEvaluate value={`1 ${variable}`} variables={defaultVariables} functions={defaultFunctions} />
                    </div>
                </div>
            ))}
        </div>
    ))
