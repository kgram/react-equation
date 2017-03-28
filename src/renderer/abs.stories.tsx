import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - absolute', module)
    .add('Simple', () => (
        <EquationWrapper>abs(-32)</EquationWrapper>
    ))
    .add('Tall expression', () => (
        <EquationWrapper>abs(-pi/25^2)</EquationWrapper>
    ))
    .add('Complex combinations', () => (
        <EquationWrapper>2**abs(k)+(5*abs(x))/x^2</EquationWrapper>
    ))
