import React from 'react'

import { EquationWrapper } from './StoryEquationWrapper'

export default {
    title: 'rendering/comparisons',
    component: EquationWrapper,
}

export const Equals = () => (
    <EquationWrapper disableEvaluation value='7*17=119' />
)

export const LessThan = () => (
    <EquationWrapper disableEvaluation value='15<22' />
)

export const GreaterThan = () => (
    <EquationWrapper disableEvaluation value='22>15' />
)

export const LessThanOrEqual = () => (
    <EquationWrapper disableEvaluation value='7*17≤150' />
)

export const GreaterThanOrEqual = () => (
    <EquationWrapper disableEvaluation value='25≥25' />
)

export const AlmostEqual = () => (
    <EquationWrapper disableEvaluation value='π≈3.14' />
)
