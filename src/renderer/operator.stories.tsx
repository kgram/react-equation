import * as React from 'react'
import { storiesOf } from '@storybook/react'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Operators', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Addition', () => (
        <Equation evaluate>5236236+43435</Equation>
    ))
    .add('Subtraction', () => (
        <Equation evaluate>34634-4546</Equation>
    ))
    .add('Multiplication', () => (
        <Equation evaluate>5*3</Equation>
    ))
    .add('Multiplication implied (space)', () => (
        <Equation evaluate>5 x</Equation>
    ))
    .add('Division', () => (
        <Equation evaluate>5÷2</Equation>
    ))
    .add('Plus/minus', () => (
        <Equation evaluate>5±10</Equation>
    ))
    .add('Leading minus', () => (
        <Equation evaluate>-10 * (-10)</Equation>
    ))
    .add('Leading plus/minus', () => (
        <Equation evaluate>±10 * (±10)</Equation>
    ))
    .add('Operators', () => (
        <Equation evaluate>5*x+2*y</Equation>
    ))
