import * as React from 'react'
import { storiesOf } from '@storybook/react'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - square root', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>sqrt(25)</Equation>
    ))
    .add('Long', () => (
        <Equation evaluate>sqrt(1/π^2+15 e/22)</Equation>
    ))
    .add('Tall above', () => (
        <Equation evaluate>sqrt(1/2/3/4/5/6)</Equation>
    ))
    .add('Tall below', () => (
        <Equation evaluate>sqrt(1/(2/(3/(4/(5/6)))))</Equation>
    ))
