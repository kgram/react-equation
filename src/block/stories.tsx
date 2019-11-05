import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('block', module)
    .add('Simple', () => (
        <EquationWrapper value='(10+3)*(2+5)' />
    ))
    .add('Implied mult. alignment', () => (
        <EquationWrapper value='5 (2+5)' />
    ))
    .add('Tall above', () => (
        <EquationWrapper value='(1/2/3/4)' />
    ))
    .add('Tall below', () => (
        <EquationWrapper value='(1/(2/(3/(4))))' />
    ))
    .add('Nested', () => (
        <EquationWrapper value='((((1))/((2))))' />
    ))
