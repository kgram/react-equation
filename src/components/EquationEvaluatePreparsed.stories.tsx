import React from 'react'
import { storiesOf } from '@storybook/react'
import { parse } from 'equation-parser'

import { RefLogger } from './StoryRefLogger'
import { EquationEvaluatePreparsed } from './EquationEvaluatePreparsed'

storiesOf('components/EquationEvaluatePreparsed', module)
    .add('Ref, valid', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+2')} />}
        />
    ))
    .add('Ref, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+(2')} />}
        />
    ))
    .add('Ref, invalid result', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+10q')} />}
        />
    ))
