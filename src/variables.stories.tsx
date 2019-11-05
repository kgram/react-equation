import * as React from 'react'
import { storiesOf } from '@storybook/react'

import defaultVariables from './resolver/default-variables'

import Equation from './equation'

storiesOf('variable lookup', module)
    .add('All variables', () => (
        <div>
            {Object.keys(defaultVariables).map((variable) => (
                <div key={variable}>
                    <div className='equation-wrapper'>
                        <Equation value={`1 ${variable}`} evaluate />
                    </div>
                </div>
            ))}
        </div>
    ))
