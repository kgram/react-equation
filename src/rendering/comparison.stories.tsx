import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from './StoryEquationWrapper'

storiesOf('rendering/comparisons', module)
    .add('Equals', () => (
        <EquationWrapper disableEvaluation value='7*17=119' />
    ))
    .add('Less than', () => (
        <EquationWrapper disableEvaluation value='15<22' />
    ))
    .add('Greater than', () => (
        <EquationWrapper disableEvaluation value='22>15' />
    ))
    .add('Less than or equal', () => (
        <EquationWrapper disableEvaluation value='7*17≤150' />
    ))
    .add('Greater than or equal', () => (
        <EquationWrapper disableEvaluation value='25≥25' />
    ))
    .add('Almost equal', () => (
        <EquationWrapper disableEvaluation value='π≈3.14' />
    ))
