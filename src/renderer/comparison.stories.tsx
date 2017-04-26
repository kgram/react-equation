import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Comparisons', module)
    .add('Equals', () => (
        <EquationWrapper>7*17=119</EquationWrapper>
    ))
    .add('Less than', () => (
        <EquationWrapper>22{'<'}15</EquationWrapper>
    ))
    .add('Greater than', () => (
        <EquationWrapper>15>22</EquationWrapper>
    ))
    .add('Less than or equal', () => (
        <EquationWrapper>7*17≤150</EquationWrapper>
    ))
    .add('Greater than or equal', () => (
        <EquationWrapper>25≥25</EquationWrapper>
    ))
    .add('Almost equal', () => (
        <EquationWrapper>π≈3.14</EquationWrapper>
    ))
