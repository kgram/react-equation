import { forwardRef, memo, Ref, useImperativeHandle } from 'react'
import { EquationNode, EquationParserError } from 'equation-parser'
import { EquationResolveError, FormatOptions, formatPreresolved, resolve, ResultNode, ResultResolveError } from 'equation-resolver'

import { RenderOptions }  from '../types/RenderOptions'

import { joinClasses } from '../utils/joinClasses'
import { render }  from '../rendering'

import { useEquationOptions }  from './useEquationOptions'

export type Props = FormatOptions & RenderOptions & {
    value: EquationNode | EquationParserError,
    unit?: EquationNode | EquationParserError,

    style?: React.CSSProperties,
    className?: string,
}

const unionArrays = <T extends any>(a: T[] | undefined, b: T[] | undefined): T[] | undefined => {
    if (!a) {
        return b
    } else if (!b) {
        return a
    } else {
        return [...a, ...b]
    }
}

type RefValue = {
    /** Equation can be evaluated */
    valid: boolean,
    /** Evaluated result of the equation */
    result: ResultNode | ResultResolveError,
    /** Evaluated result of the unit passed */
    unitResult: ResultNode | ResultResolveError | null,
    /** Equation combined with result expressed as unit */
    resultEquation: EquationNode | EquationParserError | EquationResolveError,
}

export const EquationEvaluatePreparsed = memo(forwardRef(({
    value,
    errorHandler,
    className,
    style,
    unit,
    variables: localVariables,
    functions: localFunctions,
    simplifiableUnits: localSimplifiableUnits,
    decimals: localDecimals,
}: Props, ref: Ref<RefValue>) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,

        variables: globalVariables,
        functions: globalFunctions,
        simplifiableUnits: globalSimplifiableUnits,
        decimals: globalDecimals,
    } = useEquationOptions()

    const formatOptions: FormatOptions = {
        variables: { ...globalVariables, ...localVariables },
        functions: { ...globalFunctions, ...localFunctions},
        simplifiableUnits: unionArrays(localSimplifiableUnits, globalSimplifiableUnits),
        decimals: localDecimals || globalDecimals,
    }

    const result = resolve(value, formatOptions)
    const unitResult = unit ? resolve(unit, formatOptions) : null
    const resultEquation = formatPreresolved(value, unit, result, unitResult, formatOptions)

    useImperativeHandle(ref, () => ({
        valid: resultEquation.type !== 'resolve-error' && resultEquation.type !== 'parser-error',
        result,
        unitResult,
        resultEquation,
    }))

    return render(
        resultEquation,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: joinClasses(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
