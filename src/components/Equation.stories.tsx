import React from 'react'

import { RefLogger } from './StoryRefLogger'
import { Equation } from './Equation'

export default {
    title: 'components/Equation',
    component: Equation,
}

export const RefValid = () => (
    <RefLogger
        render={(ref) => <Equation ref={ref} value='2+2' />}
    />
)

export const RefInvalidEquation = () => (
    <RefLogger
        render={(ref) => <Equation ref={ref} value='2+(2' />}
    />
)
