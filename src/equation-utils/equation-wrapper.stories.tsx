import * as React from 'react'
import classes from './stories.scss'

import { VariableLookup, FunctionLookup } from './resolver'

import {
    Equation,
} from '.'

export default function EquationWrapper({ children, input = true, evaluate = true, variables, functions }: {
    children?: string,
    input?: boolean,
    evaluate?: boolean,
    variables?: VariableLookup,
    functions?: FunctionLookup,
}) {
    return (
        <div>
            {input && <div><pre className={classes.equationWrapperRaw}>{children}</pre></div>}
            <div className={classes.equationWrapper}>
                <Equation evaluate={evaluate} variables={variables} functions={functions}>{children}</Equation>
            </div>
        </div>
    )
}
