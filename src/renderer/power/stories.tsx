import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Equation from '../../equation'
import EquationWrapper from '../../../storybook/equation-wrapper'

storiesOf('power', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>5^3</Equation>
    ))
    .add('Complex base', () => (
        <Equation evaluate>(3/4)^2</Equation>
    ))
    .add('Complex exponent', () => (
        <Equation evaluate>5^(1/2)</Equation>
    ))
    .add('Longer exponent', () => (
        <Equation evaluate>5^(5*x+2*y)</Equation>
    ))
    .add('Tall exponent alignment', () => (
        <Equation evaluate>1/2/3 * 5^(1/2/3)</Equation>
    ))
