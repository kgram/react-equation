import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Functions', module)
    .add('Simple', () => (
        <EquationWrapper>sin(0.2)</EquationWrapper>
    ))
    .add('Tall argument', () => (
        <EquationWrapper>sin(2/3**π)</EquationWrapper>
    ))
    .add('Nested', () => (
        <EquationWrapper>f(g(x))</EquationWrapper>
    ))
    .add('Multiple arguments', () => (
        <EquationWrapper>log(1024, 2)</EquationWrapper>
    ))
    .add('Multiple, tall arguments', () => (
        <EquationWrapper>unkownfunction(22/55*x^2, 52^(1/2))</EquationWrapper>
    ))
