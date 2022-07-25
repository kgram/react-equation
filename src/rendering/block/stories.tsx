import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/block',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='(10+3)*(2+5)' />
)

export const ImpliedMultAlignment = () => (
    <EquationWrapper value='5 (2+5)' />
)

export const TallAbove = () => (
    <EquationWrapper value='(1/2/3/4)' />
)

export const TallBelow = () => (
    <EquationWrapper value='(1/(2/(3/(4))))' />
)

export const Nested = () => (
    <EquationWrapper value='((((1))/((2))))' />
)
