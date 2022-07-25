import React from 'react'
import { defaultFunctions, defaultVariables } from 'equation-resolver'

import { EquationOptions, defaultErrorHandler } from '../src'

import './styles.css'

export const decorators = [
    (story) => (
        <EquationOptions
            errorHandler={defaultErrorHandler}
            functions={defaultFunctions}
            variables={defaultVariables}
        >
            {story()}
        </EquationOptions>
    ),
]
