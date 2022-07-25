import React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../StoryEquationWrapper'

storiesOf('special/sum', module)
    .add('Simple', () => (
        <EquationWrapper value='sum(n,1,5,n)' />
    ))
    .add('Long arguments', () => (
        <EquationWrapper value='sum(n,log(2^2^2/2,2),5^2,2 n^2+5 n)' />
    ))
    .add('Tall above', () => (
        <EquationWrapper value='sum(n,1,10,1/2/3/4/5)' />
    ))
    .add('Tall below', () => (
        <EquationWrapper value='sum(n,1,10,1/(2/(3/(4/5))))' />
    ))
