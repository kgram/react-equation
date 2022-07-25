import React from 'react'
import { storiesOf } from '@storybook/react'
import { parse } from 'equation-parser'

import { RefLogger } from './StoryRefLogger'
import { EquationPreparsed } from './EquationPreparsed'

storiesOf('components/EquationPreparsed', module)
    .add('Ref, valid', () => (
        <RefLogger
            render={(ref) => <EquationPreparsed ref={ref} value={parse('2+2')} />}
        />
    ))
    .add('Ref, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationPreparsed ref={ref} value={parse('2+(2')} />}
        />
    ))
