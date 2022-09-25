import React, { ReactNode } from 'react'

import { EquationContext } from '.'

export default {
    title: 'components/EquationContext',
    component: EquationContext,
}

const Wrapper = ({ children }: { children: ReactNode }) => (
    <span style={{ outline: '#7ec6c6 dashed 2px', display: 'inline-block' }}>{children}</span>
)

export const Equation = () => (
    <EquationContext
        render={({ equation }) => (
            <>
                <p>This is an equation in context</p>
                <p><Wrapper>{equation('1 + 2 + 3')}</Wrapper></p>
                <p>Some text with <Wrapper>{equation('-x^2 + 1/(2/3)')}</Wrapper> and <Wrapper>{equation('1/2/3 + x^2')}</Wrapper> in the middle</p>
            </>
        )}
    />
)

export const EquationEvaluated = () => (
    <EquationContext
        render={({ evaluate }) => (
            <>
                <p>This is an evaluated equation in context</p>
                <p><Wrapper>{evaluate('1 + 2 + 3')}</Wrapper></p>
            </>
        )}
    />
)

export const Variable = () => (
    <EquationContext
        render={({ variable }) => (
            <>
                <p>First we have a width</p>
                <p><Wrapper>{variable('w', '210mm')}</Wrapper></p>
                <p>Then we calculate the length</p>
                <p><Wrapper>{variable('l', 'sqrt(2) * w', { showResult: true, unit: 'mm' })}</Wrapper></p>
                <p>The area is <Wrapper>{variable('A', 'w * l', { showResult: true, unit: 'cm^2' })}</Wrapper></p>
            </>
        )}
    />
)

export const Function = () => (
    <EquationContext
        render={({ func, evaluate }) => (
            <>
                <p>Given</p>
                <p><Wrapper>{func('f(x)', '(x - 1) / (x + 1)')}</Wrapper></p>
                <p>and</p>
                <p><Wrapper>{func('g(x)', 'sin(x^2 + 1)')}</Wrapper></p>
                <p>calculate</p>
                <p><Wrapper>{evaluate('f(2) + sum(n, 1, 3, g(n))')}</Wrapper></p>
            </>
        )}
    />
)

export const Expression = () => (
    <EquationContext
        render={({ expression }) => (
            <>
                <p><Wrapper>{expression('a = 2')}</Wrapper> Renders a = 2 and defines a</p>
                <p><Wrapper>{expression('b = 5a =')}</Wrapper> Renders b = 5a = 10 and defines b</p>
                <p><Wrapper>{expression('c = 1/b = _ %')}</Wrapper> Renders c = 1/b = 10% and defines c</p>
                <p><Wrapper>{expression('f(x) = x^2')}</Wrapper> Renders f(x) = x^2 and defines f(x)</p>
                <p><Wrapper>{expression('2a + f(a) =')}</Wrapper> Renders 2a + f(a) = 8</p>
                <p><Wrapper>{expression('15m^2')}</Wrapper> Renders 15m^2</p>
            </>
        )}
    />
)

export const ErrorVariableNaming = () => (
    <EquationContext
        render={({ variable }) => (
            <>
                <Wrapper>{variable('1 + 2', '1 + 2 + 3')}</Wrapper>
            </>
        )}
    />
)

export const ErrorFunctionSignature = () => (
    <EquationContext
        render={({ func }) => (
            <>
                <p><Wrapper>{func('f(2)', '1 + 2 + 3')}</Wrapper></p>
                <p><Wrapper>{func('1 + 2', '1 + 2 + 3')}</Wrapper></p>
            </>
        )}
    />
)
