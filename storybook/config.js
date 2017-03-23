import { configure } from '@kadira/storybook';

import './default.scss'

function loadStories() {
    const context = require.context('../src', true, /(?:\/|\.)stories\.(js|ts|tsx)$/);
    return context.keys().forEach((file) => context(file));
}

configure(loadStories, module);