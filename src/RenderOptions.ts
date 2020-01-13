import { CSSProperties } from 'react'

import { ErrorHandler } from './ErrorHandler'

export type RenderOptions = {
    errorHandler?: ErrorHandler,
    className?: string,
    style?: CSSProperties,
}
