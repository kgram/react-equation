import * as React from 'react'
import { storiesOf } from '@storybook/react'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Matrix', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Vector', () => (
        <Equation evaluate>[1,2,3,4]</Equation>
    ))
    .add('Vector tall cells', () => (
        <Equation evaluate>[1/2/3/4,2,3,4^3^2^1]</Equation>
    ))
    .add('H. vector', () => (
        <Equation evaluate>[[1,2,3,4]]</Equation>
    ))
    .add('H. vector tall cells', () => (
        <Equation evaluate>[[1/2/3/4, 2, 3, 4^3^2^1]]</Equation>
    ))
    .add('Matrix', () => (
        <Equation evaluate>[[1,0,0][0,1,0][0,0,1]]</Equation>
    ))
    .add('Matrix tall cells', () => (
        <Equation evaluate>[[1,0,0][0,1/cos(θ)/2,-1/sin(θ)][0,1/sin(θ),1/cos(θ)]]</Equation>
    ))
    .add('Matrix alignment', () => (
        <Equation evaluate>(1 / ([[1,0,0][0,1,0][0,0,1]] * 10) + 3) / 2 + [[1,0,0][0,1,0][0,0,1]] ^ 2</Equation>
    ))
