import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Equation from '../../../equation'
import EquationWrapper from '../../../../storybook/equation-wrapper'

storiesOf('special/sum', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>sum(n,1,5,n)</Equation>
    ))
    .add('Long arguments', () => (
        <Equation evaluate>sum(n,log(2^2^2/2,2),5^2,2 n^2+5 n)</Equation>
    ))
    .add('Tall above', () => (
        <Equation evaluate>sum(n,1,10,1/2/3/4/5)</Equation>
    ))
    .add('Tall below', () => (
        <Equation evaluate>sum(n,1,10,1/(2/(3/(4/5))))</Equation>
    ))
