import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Powers', module)
    .add('Simple', () => (
        <EquationWrapper>5^3</EquationWrapper>
    ))
    .add('Complex base', () => (
        <EquationWrapper>(3/4)^2</EquationWrapper>
    ))
    .add('Complex exponent', () => (
        <EquationWrapper>5^(1/2)</EquationWrapper>
    ))
    .add('Longer exponent', () => (
        <EquationWrapper>5^(5*x+2*y)</EquationWrapper>
    ))
    .add('Tall exponent alignment', () => (
        <EquationWrapper>1/2/3 * 5^(1/2/3)</EquationWrapper>
    ))
