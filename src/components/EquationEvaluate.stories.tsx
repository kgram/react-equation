import React from 'react'
import { storiesOf } from '@storybook/react'

import { RefLogger } from './StoryRefLogger'
import { Equation } from './Equation'
import { EquationEvaluate } from './EquationEvaluate'

storiesOf('components/EquationEvaluate', module)
    .add('Ref, valid', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+2' />}
        />
    ))
    .add('Ref, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+(2' />}
        />
    ))
    .add('Ref, invalid result', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+10q' />}
        />
    ))
    .add('Ref, invalid variablesEvaluated', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+10q' variablesEvaluated={{ q: '5r' }} />}
        />
    ))
    .add('variablesEvaluated, simple', () => (
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
    .add('variablesEvaluated, cascade', () => (
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
    .add('variablesEvaluated, errors', () => (
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
