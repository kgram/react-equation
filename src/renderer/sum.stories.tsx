import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Special - sum', module)
    .add('Simple', () => (
        <EquationWrapper>sum(n,1,5,n)</EquationWrapper>
    ))
    .add('Long arguments', () => (
        <EquationWrapper>sum(n,log(2^2^2/2,2),5^2,2**n^2+5**n)</EquationWrapper>
    ))
    .add('Tall above', () => (
        <EquationWrapper>sum(n,1,10,1/2/3/4/5)</EquationWrapper>
    ))
    .add('Tall below', () => (
        <EquationWrapper>sum(n,1,10,1/(2/(3/(4/5))))</EquationWrapper>
    ))
