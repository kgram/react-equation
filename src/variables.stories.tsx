import * as React from 'react'
import { storiesOf } from '@storybook/react'

import defaultVariables from './resolver/default-variables'

import classes from '../storybook/styles.scss'

import Equation from './equation'

storiesOf('variable lookup', module)
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
