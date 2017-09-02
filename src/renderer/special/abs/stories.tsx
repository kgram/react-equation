import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Equation from '../../../equation'
import EquationWrapper from '../../../../storybook/equation-wrapper'

storiesOf('special/abs', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>abs(-32)</Equation>
    ))
    .add('Tall expression', () => (
        <Equation evaluate>abs(-π/25^2)</Equation>
    ))
    .add('Complex combinations', () => (
        <Equation evaluate>2 abs(k)+(5*abs(x))/x^2</Equation>
    ))
