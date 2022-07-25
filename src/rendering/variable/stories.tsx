import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../StoryEquationWrapper'

storiesOf('rendering/variable', module)
    .add('Simple', () => (
        <EquationWrapper value='x' />
    ))
    .add('Numbers', () => (
        <EquationWrapper value='x52yh' />
    ))
    .add('Index', () => (
        <EquationWrapper value='x_5 * 2' />
    ))
    .add('Multiple indices', () => (
        <EquationWrapper value='x_y_z_5_2_3 * 2' />
    ))
