import React from 'react'

import { EquationWrapper } from './StoryEquationWrapper'

export default {
    title: 'rendering/operator',
    component: EquationWrapper,
}

export const Addition = () => (
    <EquationWrapper value='5236236+43435' />
)

export const Subtraction = () => (
    <EquationWrapper value='34634-4546' />
)

export const Multiplication = () => (
    <EquationWrapper value='5*3' />
)
export const MultiplicationImpliedSpace = () => (
    <EquationWrapper value='5 x' />
)

export const Division = () => (
    <EquationWrapper value='5÷2' />
)

export const PlusMinus = () => (
    <EquationWrapper value='5±10' />
)

export const LeadingMinus = () => (
    <EquationWrapper value='-10 * (-10)' />
)

export const LeadingPlusMinus = () => (
    <EquationWrapper value='±10 * (±10)' />
)
