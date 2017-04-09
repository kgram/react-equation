import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Variables', module)
    .add('Simple', () => (
        <EquationWrapper>x</EquationWrapper>
    ))
    .add('Numbers', () => (
        <EquationWrapper>x52yh</EquationWrapper>
    ))
    .add('Index', () => (
        <EquationWrapper>x_5 * 2</EquationWrapper>
    ))
    .add('Multiple indices', () => (
        <EquationWrapper>x_y_z_5_2_3 * 2</EquationWrapper>
    ))
