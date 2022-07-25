import React from 'react'

import { EquationWrapper } from '../StoryEquationWrapper'

export default {
    title: 'rendering/matrix',
    component: EquationWrapper,
}

export const Vector = () => (
    <EquationWrapper value='[1,2,3,4]' />
)

export const VectorTallCells = () => (
    <EquationWrapper value='[1/2/3/4,2,3,4^3^2^1]' />
)

export const HVector = () => (
    <EquationWrapper value='[[1,2,3,4]]' />
)

export const HVectorTallCells = () => (
    <EquationWrapper value='[[1/2/3/4, 2, 3, 4^3^2^1]]' />
)

export const Matrix = () => (
    <EquationWrapper value='[[1,0,0][0,1,0][0,0,1]]' />
)

export const MatrixTallCells = () => (
    <EquationWrapper value='[[1,0,0][0,1/cos(θ)/2,-1/sin(θ)][0,1/sin(θ),1/cos(θ)]]' />
)

export const MatrixAlignment = () => (
    <EquationWrapper value='(1 / ([[1,0,0][0,1,0][0,0,1]] * 10) + 3) / 2 + [[1,0,0][0,1,0][0,0,1]] ^ 2' />
)
