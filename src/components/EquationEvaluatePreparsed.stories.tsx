import React from 'react'
import { parse } from 'equation-parser'

import { RefLogger } from './StoryRefLogger'
import { EquationEvaluatePreparsed } from './EquationEvaluatePreparsed'

export default {
    title: 'components/EquationEvaluatePreparsed',
    component: EquationEvaluatePreparsed,
}

export const RefValid = () => (
    <RefLogger
        render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+2')} />}
    />
)

export const RefInvalidEquation = () => (
    <RefLogger
        render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+(2')} />}
    />
)

export const RefInvalidResult = () => (
    <RefLogger
        render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+10q')} />}
    />
)
