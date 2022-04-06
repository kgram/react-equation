import { useContext, forwardRef, useImperativeHandle, Ref, memo } from 'react'
import classnames from 'classnames'

import { EquationNode, EquationParserError, parse } from 'equation-parser'

import { RenderOptions } from './RenderOptions'

import { render }  from './render'
import { context }  from './context'

export type Props = RenderOptions & {
    /** Equation as text */
    value: string,
}

type RefValue = {
    /** Equation is valid */
    valid: boolean,
    /** Parsed equation */
    equation: EquationNode | EquationParserError,
}

export const Equation = memo(forwardRef(({ value, errorHandler, className, style }: Props, ref: Ref<RefValue>) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,
    } = useContext(context)

    const equation = parse(value)

    useImperativeHandle(ref, () => ({
        valid: equation.type !== 'parser-error',
        equation,
    }))

    return render(
        equation,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
