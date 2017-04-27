import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import defaultVariables from './resolver/default-variables'

import classes from './stories.scss'
import './style.scss'

import Equation from './equation'

storiesOf('Available variables', module)
    .add('All variables', () => (
        <div>
            {Object.keys(defaultVariables).map((variable) => (
                <div key={variable}>
                    <div className={classes.equationWrapper}>
                        <Equation evaluate>{`1 ${variable}`}</Equation>
                    </div>
                </div>
            ))}
        </div>
    ))
