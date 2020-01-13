import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { defaultFunctions, defaultVariables } from 'equation-resolver'

import { EquationOptions, defaultErrorHandler } from '../src'

import './styles.css'

function loadStories() {
    const context = require.context('../src', true, /(?:\/|\.)stories\.(js|ts|tsx)$/)
    return context.keys().forEach((file) => context(file))
}

addDecorator((story) => (
    <EquationOptions
        errorHandler={defaultErrorHandler}
        functions={defaultFunctions}
        variables={defaultVariables}
    >
        {story()}
    </EquationOptions>
))

configure(loadStories, module)
