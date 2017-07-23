import * as React from 'react'
import { storiesOf } from '@storybook/react'

import '../stories.scss'
import '../style.scss'

import Equation from '../equation'
import EquationWrapper from '../equation-wrapper.stories'

storiesOf('Fractions', module)
    .addDecorator((story) => (
        <EquationWrapper>{story()}</EquationWrapper>
    ))
    .add('Simple', () => (
        <Equation evaluate>3/4</Equation>
    ))
    .add('Large numerator', () => (
        <Equation evaluate>(5+2*7)/4</Equation>
    ))
    .add('Large denominator', () => (
        <Equation evaluate>2/(533*23+252)</Equation>
    ))
    .add('Negated', () => (
        <Equation evaluate>-2/3</Equation>
    ))
    .add('Negated, uneven height', () => (
        <Equation evaluate>-2/(2^2)</Equation>
    ))
    .add('Nested', () => (
        <Equation evaluate>2/(10*2/(533*23+252))</Equation>
    ))
    .add('Nested, complex', () => (
        <Equation evaluate>3/4*(2+2/533*23)/(23+252)*2</Equation>
    ))
    .add('Tall above', () => (
        <Equation evaluate>1/2/3/4/5/6/7/8/9/10</Equation>
    ))
    .add('Tall below', () => (
        <Equation evaluate>1/(2/(3/(4/(5/(6/(7/(8/(9/10))))))))</Equation>
    ))
    .add('Tall above /w more', () => (
        <Equation evaluate>(2*(2*(2*(2*(2*(2*(2*(2*1/2)/3)/4)/5)/6)/7)/8)/9)/10</Equation>
    ))
    .add('Tall below /w more', () => (
        <Equation evaluate>1/(2*2/(2*3/(2*4/(2*5/(2*6/(2*7/(2*8/(2*9/10))))))))</Equation>
    ))
    .add('Uneven heights', () => (
        <Equation evaluate>1/(2/3) * (1/2)/3</Equation>
    ))
