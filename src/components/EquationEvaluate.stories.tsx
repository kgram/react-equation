import React from 'react'

import { RefLogger } from './StoryRefLogger'
import { Equation } from './Equation'
import { EquationEvaluate } from './EquationEvaluate'

export default {
    title: 'components/EquationEvaluate',
    component: EquationEvaluate,
}

export const RefValid = () => (
    <RefLogger
        render={(ref) => <EquationEvaluate ref={ref} value='2+2' />}
    />
)

export const RefInvalidEquation = () => (
    <RefLogger
        render={(ref) => <EquationEvaluate ref={ref} value='2+(2' />}
    />
)

export const RefInvalidResult = () => (
    <RefLogger
        render={(ref) => <EquationEvaluate ref={ref} value='2+10q' />}
    />
)

export const RefInvalidVariablesEvaluated = () => (
    <RefLogger
        render={(ref) => <EquationEvaluate ref={ref} value='2+10q' variablesEvaluated={{ q: '5r' }} />}
    />
)

export const VariablesEvaluatedSimple = () => (
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
)

export const VariablesEvaluatedCascade = () => (
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
)

export const VariablesEvaluatedErrors = () => (
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
)
