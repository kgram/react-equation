import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../storybook/equation-wrapper'

storiesOf('func', module)
    .add('Simple', () => (
        <EquationWrapper value='sin(0.2)' />
    ))
    .add('Tall argument', () => (
        <EquationWrapper value='sin(2/3 π)' />
    ))
    .add('Nested', () => (
        <EquationWrapper value='f(g(x))' />
    ))
    .add('Multiple arguments', () => (
        <EquationWrapper value='log(1024, 2)' />
    ))
    .add('Multiple, tall arguments', () => (
        <EquationWrapper value='unkownfunction(22/55*x^2, 52^(1/2))' />
    ))
