import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { EquationWrapper } from '../../../storybook/equation-wrapper'

storiesOf('fraction', module)
    .add('Simple', () => (
        <EquationWrapper value='3/4' />
    ))
    .add('Large numerator', () => (
        <EquationWrapper value='(5+2*7)/4' />
    ))
    .add('Large denominator', () => (
        <EquationWrapper value='2/(533*23+252)' />
    ))
    .add('Negated', () => (
        <EquationWrapper value='-2/3' />
    ))
    .add('Negated, uneven height', () => (
        <EquationWrapper value='-2/(2^2)' />
    ))
    .add('Nested', () => (
        <EquationWrapper value='2/(10*2/(533*23+252))' />
    ))
    .add('Nested, complex', () => (
        <EquationWrapper value='3/4*(2+2/533*23)/(23+252)*2' />
    ))
    .add('Tall above', () => (
        <EquationWrapper value='1/2/3/4/5/6/7/8/9/10' />
    ))
    .add('Tall below', () => (
        <EquationWrapper value='1/(2/(3/(4/(5/(6/(7/(8/(9/10))))))))' />
    ))
    .add('Tall above /w more', () => (
        <EquationWrapper value='(2*(2*(2*(2*(2*(2*(2*(2*1/2)/3)/4)/5)/6)/7)/8)/9)/10' />
    ))
    .add('Tall below /w more', () => (
        <EquationWrapper value='1/(2*2/(2*3/(2*4/(2*5/(2*6/(2*7/(2*8/(2*9/10))))))))' />
    ))
    .add('Uneven heights', () => (
        <EquationWrapper value='1/(2/3) * (1/2)/3' />
    ))
