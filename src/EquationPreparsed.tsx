import { useContext } from 'react'
import classnames from 'classnames'

import { EquationNode, EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

import { RenderOptions } from './RenderOptions'

import { render }  from './render'
import { context }  from './context'

export type Props = RenderOptions & {
    value: EquationNode | EquationParserError | EquationResolveError,
}

export const EquationPreparsed = ({ value, errorHandler, className, style }: Props) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,
    } = useContext(context)

    return render(
        value,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}
