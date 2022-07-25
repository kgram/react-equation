import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/fraction',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='3/4' />
)

export const LargeNumerator = () => (
    <EquationWrapper value='(5+2*7)/4' />
)

export const LargeDenominator = () => (
    <EquationWrapper value='2/(533*23+252)' />
)

export const Negated = () => (
    <EquationWrapper value='-2/3' />
)

export const NegatedUnevenHeight = () => (
    <EquationWrapper value='-2/(2^2)' />
)

export const Nested = () => (
    <EquationWrapper value='2/(10*2/(533*23+252))' />
)

export const NestedComplex = () => (
    <EquationWrapper value='3/4*(2+2/533*23)/(23+252)*2' />
)

export const TallAbove = () => (
    <EquationWrapper value='1/2/3/4/5/6/7/8/9/10' />
)

export const TallBelow = () => (
    <EquationWrapper value='1/(2/(3/(4/(5/(6/(7/(8/(9/10))))))))' />
)

export const TallAboveWMore = () => (
    <EquationWrapper value='(2*(2*(2*(2*(2*(2*(2*(2*1/2)/3)/4)/5)/6)/7)/8)/9)/10' />
)

export const TallBelowWMore = () => (
    <EquationWrapper value='1/(2*2/(2*3/(2*4/(2*5/(2*6/(2*7/(2*8/(2*9/10))))))))' />
)

export const UnevenHeights = () => (
    <EquationWrapper value='1/(2/3) * (1/2)/3' />
)
