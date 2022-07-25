import React from 'react'
import { storiesOf } from '@storybook/react'

import { RefLogger } from './StoryRefLogger'
import { Equation } from './Equation'

storiesOf('components/Equation', module)
    .add('Ref, valid', () => (
        <RefLogger
            render={(ref) => <Equation ref={ref} value='2+2' />}
        />
    ))
    .add('Ref, invalid equation', () => (
        <RefLogger
            render={(ref) => <Equation ref={ref} value='2+(2' />}
        />
    ))
