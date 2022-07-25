import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/power',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='5^3' />
)

export const ComplexBase = () => (
    <EquationWrapper value='(3/4)^2' />
)

export const ComplexExponent = () => (
    <EquationWrapper value='5^(1/2)' />
)

export const LongerExponent = () => (
    <EquationWrapper value='5^(5*x+2*y)' />
)

export const TallExponentAlignment = () => (
    <EquationWrapper value='1/2/3 * 5^(1/2/3)' />
)
