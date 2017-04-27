import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - absolute', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>abs(-32)</Equation>
    ))
    .add('Tall expression', () => (
        <Equation evaluate>abs(-π/25^2)</Equation>
    ))
    .add('Complex combinations', () => (
        <Equation evaluate>2 abs(k)+(5*abs(x))/x^2</Equation>
    ))
