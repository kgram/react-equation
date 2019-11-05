import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('special/root', module)
    .add('Simple', () => (
        <EquationWrapper value='root(3,8)' />
    ))
    .add('Long', () => (
        <EquationWrapper value='root(3,1/π^2+15 e/22)' />
    ))
    .add('Tall above', () => (
        <EquationWrapper value='root(10, 1/2/3/4/5/6)' />
    ))
    .add('Tall below', () => (
        <EquationWrapper value='root(10, 1/(2/(3/(4/(5/6)))))' />
    ))
    .add('Tall index', () => (
        <EquationWrapper value='root(36/12,5)' />
    ))
    .add('Complex combination', () => (
        <EquationWrapper value='1/root(12,2) * root(12/3, 50)' />
    ))
