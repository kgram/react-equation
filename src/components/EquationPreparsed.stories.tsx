import React from 'react'
import { parse } from 'equation-parser'

import { RefLogger } from './StoryRefLogger'
import { EquationPreparsed } from './EquationPreparsed'

export default {
    title: 'components/EquationPreparsed',
    component: EquationPreparsed,
}

export const RefValid = () => (
    <RefLogger
        render={(ref) => <EquationPreparsed ref={ref} value={parse('2+2')} />}
    />
)

export const RefInvalidEquation = () => (
    <RefLogger
        render={(ref) => <EquationPreparsed ref={ref} value={parse('2+(2')} />}
    />
)
