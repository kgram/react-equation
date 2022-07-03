import { forwardRef, memo, Ref, useImperativeHandle } from 'react'

import { EquationNode, EquationParserError } from 'equation-parser'
import { EquationResolveError } from 'equation-resolver'

import { joinClasses } from './utils/joinClasses'

import { RenderOptions } from './RenderOptions'

import { render }  from './render'
import { useEquationOptions }  from './useEquationOptions'

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
    } = useEquationOptions()

    useImperativeHandle(ref, () => ({}))

    return render(
        value,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: joinClasses(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
