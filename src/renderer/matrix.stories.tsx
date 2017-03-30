import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Matrix', module)
    .add('Vector', () => (
        <EquationWrapper>[1,2,3,4]</EquationWrapper>
    ))
    .add('Vector tall cells', () => (
        <EquationWrapper>[1/2/3/4,2,3,4^3^2^1]</EquationWrapper>
    ))
    .add('H. vector', () => (
        <EquationWrapper>[[1][2][3][4]]</EquationWrapper>
    ))
    .add('H. vector tall cells', () => (
        <EquationWrapper>[[1/2/3/4][2][3][4^3^2^1]]</EquationWrapper>
    ))
    .add('Matrix', () => (
        <EquationWrapper>[[1,0,0][0,1,0][0,0,1]]</EquationWrapper>
    ))
    .add('Matrix tall cells', () => (
        <EquationWrapper>[[1,0,0][0,1/cos(θ)/2,-1/sin(θ)][0,1/sin(θ),1/cos(θ)]]</EquationWrapper>
    ))
    .add('Matrix alignment', () => (
        <EquationWrapper>(1 / ([[1,0,0][0,1,0][0,0,1]] * 10) + 3) / 2 + [[1,0,0][0,1,0][0,0,1]] ^ 2</EquationWrapper>
    ))
