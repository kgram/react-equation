import React from 'react'

import { EquationWrapper } from '../../StoryEquationWrapper'

export default {
    title: 'rendering/special/sqrt',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='sqrt(25)' />
)

export const Long = () => (
    <EquationWrapper value='sqrt(1/π^2+15 e/22)' />
)

export const TallAbove = () => (
    <EquationWrapper value='sqrt(1/2/3/4/5/6)' />
)

export const TallBelow = () => (
    <EquationWrapper value='sqrt(1/(2/(3/(4/(5/6)))))' />
)
