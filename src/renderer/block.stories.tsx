import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Blocks', module)
    .add('Simple', () => (
        <EquationWrapper>(10+3)*(2+5)</EquationWrapper>
    ))
    .add('Implied mult. alignment', () => (
        <EquationWrapper>5 (2+5)</EquationWrapper>
    ))
    .add('Tall above', () => (
        <EquationWrapper>(1/2/3/4)</EquationWrapper>
    ))
    .add('Tall below', () => (
        <EquationWrapper>(1/(2/(3/(4))))</EquationWrapper>
    ))
    .add('Nested', () => (
        <EquationWrapper>((((1))/((2))))</EquationWrapper>
    ))
