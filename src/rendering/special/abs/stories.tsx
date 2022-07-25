import React from 'react'

import { EquationWrapper } from '../../StoryEquationWrapper'

export default {
    title: 'rendering/special/abs',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='abs(-32)' />
)

export const TallExpression = () => (
    <EquationWrapper value='abs(-π/25^2)' />
)

export const ComplexCombinations = () => (
    <EquationWrapper value='2 abs(k)+(5*abs(x))/x^2' />
)
