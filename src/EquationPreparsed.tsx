import { forwardRef, memo, Ref, useContext, useImperativeHandle } from 'react'
import classnames from 'classnames'

import { EquationNode, EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

import { RenderOptions } from './RenderOptions'

import { render }  from './render'
import { context }  from './context'

export type Props = RenderOptions & {
    value: EquationNode | EquationParserError | EquationResolveError,
}

type RefValue = {
}

export const EquationPreparsed = memo(forwardRef(({ value, errorHandler, className, style }: Props, ref: Ref<RefValue>) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,
    } = useContext(context)

    useImperativeHandle(ref, () => ({}))

    return render(
        value,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
