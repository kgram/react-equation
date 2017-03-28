import * as React from 'react'
import { storiesOf } from '@kadira/storybook'

import '../stories.scss'
import '../style.scss'

import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Fractions', module)
    .add('Simple', () => (
        <EquationWrapper>3/4</EquationWrapper>
    ))
    .add('Large numerator', () => (
        <EquationWrapper>(5+2*7)/4</EquationWrapper>
    ))
    .add('Large denominator', () => (
        <EquationWrapper>2/(533*23+252)</EquationWrapper>
    ))
    .add('Negated', () => (
        <EquationWrapper>-2/3</EquationWrapper>
    ))
    .add('Negated, uneven height', () => (
        <EquationWrapper>-2/(2^2)</EquationWrapper>
    ))
    .add('Nested', () => (
        <EquationWrapper>2/(10*2/(533*23+252))</EquationWrapper>
    ))
    .add('Nested, complex', () => (
        <EquationWrapper>3/4*(2+2/533*23)/(23+252)*2</EquationWrapper>
    ))
    .add('Tall above', () => (
        <EquationWrapper>1/2/3/4/5/6/7/8/9/10</EquationWrapper>
    ))
    .add('Tall below', () => (
        <EquationWrapper>1/(2/(3/(4/(5/(6/(7/(8/(9/10))))))))</EquationWrapper>
    ))
    .add('Tall above /w more', () => (
        <EquationWrapper>(2*(2*(2*(2*(2*(2*(2*(2*1/2)/3)/4)/5)/6)/7)/8)/9)/10</EquationWrapper>
    ))
    .add('Tall below /w more', () => (
        <EquationWrapper>1/(2*2/(2*3/(2*4/(2*5/(2*6/(2*7/(2*8/(2*9/10))))))))</EquationWrapper>
    ))
    .add('Uneven heights', () => (
        <EquationWrapper>1/(2/3) * (1/2)/3</EquationWrapper>
    ))
