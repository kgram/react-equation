import { forwardRef, useImperativeHandle, Ref, memo } from 'react'

import { EquationNode, EquationParserError, parse } from 'equation-parser'

import { RenderOptions } from '../types/RenderOptions'

import { joinClasses } from '../utils/joinClasses'
import { render }  from '../rendering'

import { useEquationOptions }  from './useEquationOptions'

type Props = RenderOptions & {
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
    } = useEquationOptions()

    const equation = parse(value)

    useImperativeHandle(ref, () => ({
        valid: equation.type !== 'parser-error',
        equation,
    }))

    return render(
        equation,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: joinClasses(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
