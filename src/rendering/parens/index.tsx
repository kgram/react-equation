import React from 'react'

export default function Parens({ height, type = '()', flip = false }: { height: number, className?: string, type?: '()' | '[]' | '{}', flip?: boolean }) {
    return (
        <svg width='0.4em' style={{ verticalAlign: 'top', fill: 'currentcolor', transform: flip ? 'scale(-1, 1)' : undefined }} viewBox={`0 0 0.4 ${height}`}>
            <path d={pathBuilders[type](height)} />
        </svg>
    )
}

const pathBuilders = {
    '()'(height: number) {
        const offsetHeight = height - 1.4
        return `M0.094 0.681q0 -0.312 0.18 -0.476l0.028 -0.024l0.013 0q0.012 0 0.015 0.003t0.003 0.006q0 0.004 -0.011 0.015q-0.155 0.164 -0.155 0.476l0 ${ offsetHeight }q0 0.321 0.155 0.476q0.011 0.011 0.011 0.015q0 0.009 -0.018 0.009l-0.013 0l-0.028 -0.024q-0.18 -0.164 -0.18 -0.476Z`
    },
    '[]'(height: number) {
        const offsetHeight = height - 0.55
        return `M0.134 0.19h0.24v0.08h-0.16v${ offsetHeight }h0.16v0.08h-0.24Z`
    },
    '{}'(height: number) {
        const offsetHeight = height - 1.37
        return `M0.3472 ${ 1.161 + offsetHeight }q0 0.014 -0.0048 0.02h-0.0144q-0.0608 0 -0.104 -0.026t-0.0544 -0.08q-0.0016 -0.006 -0.0024 -0.1445v${ -offsetHeight / 2 }q0 -0.021 0 -0.053q-0.0008 -0.089 -0.004 -0.1q-0.0008 -0.001 -0.0008 -0.002q-0.0096 -0.031 -0.0368 -0.053t-0.06 -0.023q-0.0088 0 -0.0112 -0.003t-0.0024 -0.016t0.0024 -0.016t0.0112 -0.003q0.0328 0 0.06 -0.022t0.0368 -0.054q0.0032 -0.012 0.0032 -0.025t0.0016 -0.131v${ -offsetHeight / 2 }q0.0008 -0.137 0.0024 -0.144q0.0064 -0.032 0.0256 -0.053q0.0208 -0.026 0.064 -0.042q0.0296 -0.008 0.0424 -0.009q0.0016 0 0.0104 0t0.0144 -0.001h0.016q0.0048 0.006 0.0048 0.018q0 0.013 -0.0024 0.016q-0.0016 0.003 -0.0128 0.003q-0.0448 0.003 -0.0744 0.032q-0.016 0.015 -0.0208 0.034q-0.004 0.013 -0.004 0.148v${ offsetHeight / 2 }q0 0.13 -0.0008 0.136q-0.004 0.039 -0.0272 0.067t-0.0576 0.041l-0.0112 0.005l0.0112 0.005q0.0336 0.013 0.0568 0.04t0.028 0.068q0.0008 0.006 0.0008 0.136v${ offsetHeight / 2 }q0 0.1355 0.004 0.1475q0.008 0.028 0.0352 0.046t0.06 0.02q0.0112 0 0.0128 0.004q0.0024 0.002 0.0024 0.014Z`
    },
}
