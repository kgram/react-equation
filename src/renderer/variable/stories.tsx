import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Equation from '../../equation'
import EquationWrapper from '../../../storybook/equation-wrapper'

storiesOf('variable', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>x</Equation>
    ))
    .add('Numbers', () => (
        <Equation evaluate>x52yh</Equation>
    ))
    .add('Index', () => (
        <Equation evaluate>x_5 * 2</Equation>
    ))
    .add('Multiple indices', () => (
        <Equation evaluate>x_y_z_5_2_3 * 2</Equation>
    ))
