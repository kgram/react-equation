import { useContext } from 'react'
import classnames from 'classnames'

import { parse } from 'equation-parser'

import { RenderOptions } from './RenderOptions'

import { render }  from './render'
import { context }  from './context'

export type Props = RenderOptions & {
    value: string,
}

export const Equation = ({ value, errorHandler, className, style }: Props) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,
    } = useContext(context)

    return render(
        parse(value),
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}
