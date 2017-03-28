import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - root', module)
    .add('Simple', () => (
        <EquationWrapper>root(3,8)</EquationWrapper>
    ))
    .add('Long', () => (
        <EquationWrapper>root(3,1/π^2+15**e/22)</EquationWrapper>
    ))
    .add('Tall above', () => (
        <EquationWrapper>root(10, 1/2/3/4/5/6)</EquationWrapper>
    ))
    .add('Tall below', () => (
        <EquationWrapper>root(10, 1/(2/(3/(4/(5/6)))))</EquationWrapper>
    ))
    .add('Tall index', () => (
        <EquationWrapper>root(36/12,5)</EquationWrapper>
    ))
    .add('Complex combination', () => (
        <EquationWrapper>1/root(12,2) * root(12/3, 50)</EquationWrapper>
    ))
