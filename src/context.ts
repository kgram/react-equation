import { createContext } from 'react'
import { FormatOptions } from 'equation-resolver'

import { RenderOptions } from './RenderOptions'

export const context = createContext<FormatOptions & RenderOptions>({})
