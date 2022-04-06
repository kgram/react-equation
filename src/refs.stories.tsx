import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Equation, EquationEvaluate, EquationPreparsed, EquationEvaluatePreparsed } from '.'
import { parse } from 'equation-parser'

type Props = {
    render: (ref: React.MutableRefObject<any>) => JSX.Element,
}

const RefLogger = ({ render }: Props) => {
    const ref = React.useRef<any>()

    return (
        <div>
            <div>{render(ref)}</div>
            <button onClick={() => action('ref')(ref.current)}>Log ref</button>
        </div>
    )
}

storiesOf('refs', module)
    .add('Equation, valid', () => (
        <RefLogger
            render={(ref) => <Equation ref={ref} value='2+2' />}
        />
    ))
    .add('Equation, invalid equation', () => (
        <RefLogger
            render={(ref) => <Equation ref={ref} value='2+(2' />}
        />
    ))
    .add('EquationEvaluate, valid', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+2' />}
        />
    ))
    .add('EquationEvaluate, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+(2' />}
        />
    ))
    .add('EquationEvaluate, invalid result', () => (
        <RefLogger
            render={(ref) => <EquationEvaluate ref={ref} value='2+10q' />}
        />
    ))
    .add('EquationPreparsed, valid', () => (
        <RefLogger
            render={(ref) => <EquationPreparsed ref={ref} value={parse('2+2')} />}
        />
    ))
    .add('EquationPreparsed, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationPreparsed ref={ref} value={parse('2+(2')} />}
        />
    ))
    .add('EquationEvaluatePreparsed, valid', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+2')} />}
        />
    ))
    .add('EquationEvaluatePreparsed, invalid equation', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+(2')} />}
        />
    ))
    .add('EquationEvaluatePreparsed, invalid result', () => (
        <RefLogger
            render={(ref) => <EquationEvaluatePreparsed ref={ref} value={parse('2+10q')} />}
        />
    ))
