import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/variable',
    component: EquationWrapper,
}

export const Simple = () => (
    <EquationWrapper value='x' />
)

export const Numbers = () => (
    <EquationWrapper value='x52yh' />
)

export const Index = () => (
    <EquationWrapper value='x_5 * 2' />
)

export const MultipleIndices = () => (
    <EquationWrapper value='x_y_z_5_2_3 * 2' />
)
