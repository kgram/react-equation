import React from 'react'

import { EquationWrapper } from '../../StoryEquationWrapper'

export default {
    title: 'rendering/special/sum',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='sum(n,1,5,n)' />
)

export const LongArguments = () => (
    <EquationWrapper value='sum(n,log(2^2^2/2,2),5^2,2 n^2+5 n)' />
)

export const TallAbove = () => (
    <EquationWrapper value='sum(n,1,10,1/2/3/4/5)' />
)

export const TallBelow = () => (
    <EquationWrapper value='sum(n,1,10,1/(2/(3/(4/5))))' />
)
