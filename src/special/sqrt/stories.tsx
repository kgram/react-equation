import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('special/sqrt', module)
    .add('Simple', () => (
        <EquationWrapper value='sqrt(25)' />
    ))
    .add('Long', () => (
        <EquationWrapper value='sqrt(1/π^2+15 e/22)' />
    ))
    .add('Tall above', () => (
        <EquationWrapper value='sqrt(1/2/3/4/5/6)' />
    ))
    .add('Tall below', () => (
        <EquationWrapper value='sqrt(1/(2/(3/(4/(5/6)))))' />
    ))
