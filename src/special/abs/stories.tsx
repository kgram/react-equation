import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('special/abs', module)
    .add('Simple', () => (
        <EquationWrapper value='abs(-32)' />
    ))
    .add('Tall expression', () => (
        <EquationWrapper value='abs(-π/25^2)' />
    ))
    .add('Complex combinations', () => (
        <EquationWrapper value='2 abs(k)+(5*abs(x))/x^2' />
    ))
