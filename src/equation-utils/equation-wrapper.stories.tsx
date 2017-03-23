import * as React from 'react'
import classes from './stories.scss'

import {
    Equation,
} from '.'

export default function EquationWrapper({ children, input = true }: {children?: string, input?: boolean}) {
    return (
        <div>
            {input && <div><pre className={classes.equationWrapperRaw}>{children}</pre></div>}
            <div className={classes.equationWrapper}>
                <Equation evaluate>{children}</Equation>
            </div>
        </div>
    )
}
