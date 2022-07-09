import React from 'react'
import { storiesOf } from '@storybook/react'

import { Equation } from './Equation'
import { EquationEvaluate } from './EquationEvaluate'

storiesOf('variables evaluated', module)
    .add('Simple', () => (
        <>
            <div>
                <Equation
                    value='x=2^2+4'
                />
            </div>
            <div>
                <EquationEvaluate
                    variablesEvaluated={{
                        x: '2^2+4',
                    }}
                    value='2x^2+3'
                />
            </div>
        </>
    ))
    .add('Cascade', () => (
        <>
            <div>
                <Equation
                    value='x=2^2+4'
                />
            </div>
            <div>
                <Equation
                    value='y=3x'
                />
            </div>
            <div>
                <EquationEvaluate
                    variablesEvaluated={{
                        x: '2^2+4',
                        y: '3x',
                    }}
                    value='5x+2y'
                />
            </div>
        </>
    ))
    .add('Errors', () => (
        <>
            <div>
                <Equation
                    value='a=15o'
                />
            </div>
            <div>
                <Equation
                    value='b=32'
                />
            </div>
            <div>
                <EquationEvaluate
                    variablesEvaluated={{
                        a: '15o',
                        b: '2a',
                    }}
                    value='2b'
                    unit='o'
                />
            </div>
        </>
    ))
