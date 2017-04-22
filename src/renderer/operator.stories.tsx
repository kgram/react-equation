import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Operators', module)
    .add('Addition', () => (
        <EquationWrapper>5236236+43435</EquationWrapper>
    ))
    .add('Subtraction', () => (
        <EquationWrapper>34634-4546</EquationWrapper>
    ))
    .add('Multiplication', () => (
        <EquationWrapper>5*3</EquationWrapper>
    ))
    .add('Multiplication implied (space)', () => (
        <EquationWrapper>5 x</EquationWrapper>
    ))
    .add('Plus/minus', () => (
        <EquationWrapper>5±10</EquationWrapper>
    ))
    .add('Leading minus', () => (
        <EquationWrapper>-10 * (-10)</EquationWrapper>
    ))
    .add('Leading plus/minus', () => (
        <EquationWrapper>±10 * (±10)</EquationWrapper>
    ))
    .add('Operators', () => (
        <EquationWrapper>5*x+2*y</EquationWrapper>
    ))
