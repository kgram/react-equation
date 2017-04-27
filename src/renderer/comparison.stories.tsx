import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Comparisons', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Equals', () => (
        <Equation evaluate>7*17=119</Equation>
    ))
    .add('Less than', () => (
        <Equation evaluate>22{'<'}15</Equation>
    ))
    .add('Greater than', () => (
        <Equation evaluate>15>22</Equation>
    ))
    .add('Less than or equal', () => (
        <Equation evaluate>7*17≤150</Equation>
    ))
    .add('Greater than or equal', () => (
        <Equation evaluate>25≥25</Equation>
    ))
    .add('Almost equal', () => (
        <Equation evaluate>π≈3.14</Equation>
    ))
