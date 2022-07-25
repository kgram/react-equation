import { createContext } from 'react'
import { FormatOptions } from 'equation-resolver'

import { RenderOptions } from '../types/RenderOptions'

export const context = createContext<FormatOptions & RenderOptions>({})
