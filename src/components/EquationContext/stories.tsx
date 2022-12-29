import React, { ReactNode } from 'react'

import { EquationEvaluate } from '../EquationEvaluate'

import { EquationContext } from '.'
import { EquationOptions } from '../EquationOptions'

export default {
    title: 'components/EquationContext',
    component: EquationContext,
}

const Wrapper = ({ children }: { children: ReactNode }) => (
    <span style={{ outline: '#7ec6c6 dashed 2px', display: 'inline-block' }}>{children}</span>
)

export const Equation = () => (
    <EquationContext
        render={(equation) => (
            <>
                <p><Wrapper>{equation('a = 2')}</Wrapper> Renders a = 2 and defines a</p>
                <p><Wrapper>{equation('b = 5a =')}</Wrapper> Renders b = 5a = 10 and defines b</p>
                <p><Wrapper>{equation('c = 1/b = _ %')}</Wrapper> Renders c = 1/b = 10% and defines c</p>
                <p><Wrapper>{equation('f(x) = x^2')}</Wrapper> Renders f(x) = x^2 and defines f(x)</p>
                <p><Wrapper>{equation('2a + f(a) =')}</Wrapper> Renders 2a + f(a) = 8</p>
            </>
        )}
    />
)

export const GetOptions = () => (
    <EquationContext render={(equation, getOptions) => (
        <>
            <p><Wrapper>{equation('2x =')}</Wrapper> Renders Unknown variable x</p>
            <p><Wrapper><EquationEvaluate value='2x' /></Wrapper> Renders Unknown variable x</p>

            <p><Wrapper>{equation('x = 7')}</Wrapper> Renders x = 7</p>
            <p><Wrapper>{equation('2x =')}</Wrapper> Renders 2x = 14</p>
            <p><Wrapper><EquationEvaluate value='2x' /></Wrapper> Renders Unknown variable x, not part of the context</p>

            <p><Wrapper><EquationEvaluate value='2x' {...getOptions()} /></Wrapper> Renders 2x = 14</p>
            <EquationOptions {...getOptions()}>
                <p><Wrapper><EquationEvaluate value='2x' /></Wrapper> Renders 2x = 14</p>
            </EquationOptions>
        </>
    )} />
)
