import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../storybook/equation-wrapper'

storiesOf('comparisons', module)
    .add('Equals', () => (
        <EquationWrapper value='7*17=119' />
    ))
    .add('Less than', () => (
        <EquationWrapper value='15<22' />
    ))
    .add('Greater than', () => (
        <EquationWrapper value='22>15' />
    ))
    .add('Less than or equal', () => (
        <EquationWrapper value='7*17≤150' />
    ))
    .add('Greater than or equal', () => (
        <EquationWrapper value='25≥25' />
    ))
    .add('Almost equal', () => (
        <EquationWrapper value='π≈3.14' />
    ))
