import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - square root', module)
    .add('Simple', () => (
        <EquationWrapper>sqrt(25)</EquationWrapper>
    ))
    .add('Long', () => (
        <EquationWrapper>sqrt(1/π^2+15**e/22)</EquationWrapper>
    ))
    .add('Tall above', () => (
        <EquationWrapper>sqrt(1/2/3/4/5/6)</EquationWrapper>
    ))
    .add('Tall below', () => (
        <EquationWrapper>sqrt(1/(2/(3/(4/(5/6)))))</EquationWrapper>
    ))
