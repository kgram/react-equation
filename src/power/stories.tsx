import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('power', module)
    .add('Simple', () => (
        <EquationWrapper value='5^3' />
    ))
    .add('Complex base', () => (
        <EquationWrapper value='(3/4)^2' />
    ))
    .add('Complex exponent', () => (
        <EquationWrapper value='5^(1/2)' />
    ))
    .add('Longer exponent', () => (
        <EquationWrapper value='5^(5*x+2*y)' />
    ))
    .add('Tall exponent alignment', () => (
        <EquationWrapper value='1/2/3 * 5^(1/2/3)' />
    ))
