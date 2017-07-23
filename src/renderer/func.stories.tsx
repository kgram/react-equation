import * as React from 'react'
import { storiesOf } from '@storybook/react'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Functions', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>sin(0.2)</Equation>
    ))
    .add('Tall argument', () => (
        <Equation evaluate>sin(2/3 π)</Equation>
    ))
    .add('Nested', () => (
        <Equation evaluate>f(g(x))</Equation>
    ))
    .add('Multiple arguments', () => (
        <Equation evaluate>log(1024, 2)</Equation>
    ))
    .add('Multiple, tall arguments', () => (
        <Equation evaluate>unkownfunction(22/55*x^2, 52^(1/2))</Equation>
    ))
