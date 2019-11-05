import { configure } from '@storybook/react'

import './styles.css'

function loadStories() {
    const context = require.context('../src', true, /(?:\/|\.)stories\.(js|ts|tsx)$/)
    return context.keys().forEach((file) => context(file))
}

configure(loadStories, module)
