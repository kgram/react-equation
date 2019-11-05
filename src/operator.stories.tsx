import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../storybook/equation-wrapper'

storiesOf('operator', module)
    .add('Addition', () => (
        <EquationWrapper value='5236236+43435' />
    ))
    .add('Subtraction', () => (
        <EquationWrapper value='34634-4546' />
    ))
    .add('Multiplication', () => (
        <EquationWrapper value='5*3' />
    ))
    .add('Multiplication implied (space)', () => (
        <EquationWrapper value='5 x' />
    ))
    .add('Division', () => (
        <EquationWrapper value='5÷2' />
    ))
    .add('Plus/minus', () => (
        <EquationWrapper value='5±10' />
    ))
    .add('Leading minus', () => (
        <EquationWrapper value='-10 * (-10)' />
    ))
    .add('Leading plus/minus', () => (
        <EquationWrapper value='±10 * (±10)' />
    ))
