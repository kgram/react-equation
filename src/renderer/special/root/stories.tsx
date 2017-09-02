import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Equation from '../../../equation'
import EquationWrapper from '../../../../storybook/equation-wrapper'

storiesOf('special/root', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>root(3,8)</Equation>
    ))
    .add('Long', () => (
        <Equation evaluate>root(3,1/π^2+15 e/22)</Equation>
    ))
    .add('Tall above', () => (
        <Equation evaluate>root(10, 1/2/3/4/5/6)</Equation>
    ))
    .add('Tall below', () => (
        <Equation evaluate>root(10, 1/(2/(3/(4/(5/6)))))</Equation>
    ))
    .add('Tall index', () => (
        <Equation evaluate>root(36/12,5)</Equation>
    ))
    .add('Complex combination', () => (
        <Equation evaluate>1/root(12,2) * root(12/3, 50)</Equation>
    ))
