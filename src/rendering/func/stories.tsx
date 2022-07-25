import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/func',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='sin(0.2)' />
)

export const TallArgument = () => (
    <EquationWrapper value='sin(2/3 π)' />
)

export const Nested = () => (
    <EquationWrapper value='f(g(x))' />
)

export const MultipleArguments = () => (
    <EquationWrapper value='log(1024, 2)' />
)

export const MultipleTallArguments = () => (
    <EquationWrapper value='unkownfunction(22/55*x^2, 52^(1/2))' />
)
