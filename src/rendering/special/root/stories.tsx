import React from 'react'

import { EquationWrapper } from '../../StoryEquationWrapper'

export default {
    title: 'rendering/special/root',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='root(3,8)' />
)

export const Long = () => (
    <EquationWrapper value='root(3,1/π^2+15 e/22)' />
)

export const TallAbove = () => (
    <EquationWrapper value='root(10, 1/2/3/4/5/6)' />
)

export const TallBelow = () => (
    <EquationWrapper value='root(10, 1/(2/(3/(4/(5/6)))))' />
)

export const TallIndex = () => (
    <EquationWrapper value='root(36/12,5)' />
)

export const ComplexCombination = () => (
    <EquationWrapper value='1/root(12,2) * root(12/3, 50)' />
)
