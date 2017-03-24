import * as React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import { Editor, EditorState, RichUtils } from 'draft-js'
import * as mathjax from 'react-mathjax'

import 'draft-js/dist/Draft.css'

import classes from './stories.scss'
import './style.scss'

import EquationWrapper from './equation-wrapper.stories'

import * as moment from 'moment'

storiesOf('Equations', module)
    .add('Operators', () => (
        <div>
            <EquationWrapper>5*3</EquationWrapper>
            <EquationWrapper>5236236+43435</EquationWrapper>
            <EquationWrapper>34634-4546</EquationWrapper>
            <EquationWrapper>5*x+2*y</EquationWrapper>
            <EquationWrapper>5**x+2**y</EquationWrapper>
            <EquationWrapper>-10</EquationWrapper>
            <EquationWrapper>5±10</EquationWrapper>
            <EquationWrapper>±10 * (±2)</EquationWrapper>
        </div>
    ))
    .add('Fractions', () => (
        <div>
            <EquationWrapper>3/4</EquationWrapper>
            <EquationWrapper>(5+2*7)/4</EquationWrapper>
            <EquationWrapper>2/(533*23+252)</EquationWrapper>
            <EquationWrapper>-2/3</EquationWrapper>
            <EquationWrapper>-2/(2^2)</EquationWrapper>
            <EquationWrapper>2/(10*2/(533*23+252))</EquationWrapper>
            <EquationWrapper>3/4*(2+2/533*23)/(23+252)*2</EquationWrapper>
            <EquationWrapper>(2*(2*(2*(2*(2*(2*(2*(1/2)/3)/4)/5)/6)/7)/8)/9)/10</EquationWrapper>
            <EquationWrapper>1/2/3/4/5/6/7/8/9/10</EquationWrapper>
            <EquationWrapper>1/(2/(3/(4/(5/(6/(7/(8/(9/10))))))))</EquationWrapper>
            <EquationWrapper>1/(2*2/(2*3/(2*4/(2*5/(2*6/(2*7/(2*8/(2*9/10))))))))</EquationWrapper>
            <EquationWrapper>1/(2/3) * (1/2)/3</EquationWrapper>
        </div>
    ))
    .add('Powers', () => (
        <div>
            <EquationWrapper>5^3</EquationWrapper>
            <EquationWrapper>(3/4)^2</EquationWrapper>
            <EquationWrapper>5^(1/2)</EquationWrapper>
            <EquationWrapper>5^(5*x+2*y)</EquationWrapper>
            <EquationWrapper>1/2/3 * 5^(1/2/3)</EquationWrapper>
        </div>
    ))
    .add('Functions', () => (
        <div>
            <EquationWrapper>sin(0.2)</EquationWrapper>
            <EquationWrapper>sin(2/3**pi)</EquationWrapper>
            <EquationWrapper>log(1000)</EquationWrapper>
            <EquationWrapper>log(1024, 2)</EquationWrapper>
            <EquationWrapper>unkownfunction(22/55*x^2, 52^(1/2))</EquationWrapper>
        </div>
    ))
    .add('Special functions', () => (
        <div>
            <EquationWrapper>abs(-32)</EquationWrapper>
            <EquationWrapper>abs(-pi/25^2)</EquationWrapper>
            <EquationWrapper>2**x+abs(x)/x^2</EquationWrapper>
            <EquationWrapper>sum(n,1,5,n^2)</EquationWrapper>
            <EquationWrapper>sum(n,log(2^2^2/2,2),5^2,2**n^2+5**n)</EquationWrapper>
            <EquationWrapper>sum(n,1,10,1/2/3/4/5)</EquationWrapper>
        </div>
    ))
