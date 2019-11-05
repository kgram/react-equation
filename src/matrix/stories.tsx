import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../storybook/equation-wrapper'

storiesOf('matrix', module)
    .add('Vector', () => (
        <EquationWrapper value='[1,2,3,4]' />
    ))
    .add('Vector tall cells', () => (
        <EquationWrapper value='[1/2/3/4,2,3,4^3^2^1]' />
    ))
    .add('H. vector', () => (
        <EquationWrapper value='[[1,2,3,4]]' />
    ))
    .add('H. vector tall cells', () => (
        <EquationWrapper value='[[1/2/3/4, 2, 3, 4^3^2^1]]' />
    ))
    .add('Matrix', () => (
        <EquationWrapper value='[[1,0,0][0,1,0][0,0,1]]' />
    ))
    .add('Matrix tall cells', () => (
        <EquationWrapper value='[[1,0,0][0,1/cos(θ)/2,-1/sin(θ)][0,1/sin(θ),1/cos(θ)]]' />
    ))
    .add('Matrix alignment', () => (
        <EquationWrapper value='(1 / ([[1,0,0][0,1,0][0,0,1]] * 10) + 3) / 2 + [[1,0,0][0,1,0][0,0,1]] ^ 2' />
    ))
