import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import defaultVariables from './resolver/default-variables'

import './stories.scss'
import './style.scss'

import EquationWrapper from './equation-wrapper.stories'

storiesOf('Available variables', module)
    .add('All variables', () => (
        <div>
            {Object.keys(defaultVariables).map((variable) => (
                <EquationWrapper>{`1 ${variable}`}</EquationWrapper>
            ))}
        </div>
    ))
