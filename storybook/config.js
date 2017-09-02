import { configure } from '@storybook/react'

function loadStories() {
    const context = require.context('../src', true, /(?:\/|\.)stories\.(js|ts|tsx)$/)
    return context.keys().forEach((file) => context(file))
}

configure(loadStories, module)
