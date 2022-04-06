import { forwardRef, memo, Ref, useContext, useImperativeHandle } from 'react'
import classnames from 'classnames'

import { EquationNode, EquationParserError, parse } from 'equation-parser'
import { resolve, formatPreresolved, FormatOptions, ResultNode, ResultResolveError, EquationResolveError } from 'equation-resolver'

import { render }  from './render'
import { context }  from './context'
import { RenderOptions }  from './RenderOptions'

export type Props = FormatOptions & RenderOptions & {
    /** Equation as text */
    value: string,
    /** Optionally provide a unit to convert the result into */
    unit?: string,

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
    /** Equation and result valid */
    valid: boolean,
    /** Parsed equation */
    equation: EquationNode | EquationParserError,
    /** Parsed equation for the display unit */
    unitEquation: EquationNode | EquationParserError | null,
    /** Evaluated result of the equation */
    result: ResultNode | ResultResolveError,
    /** Evaluated result of the unit passed */
    unitResult: ResultNode | ResultResolveError | null,
    /** Equation combined with result expressed as unit */
    resultEquation: EquationNode | EquationParserError | EquationResolveError,
}

export const EquationEvaluate = memo(forwardRef(({
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
    } = useContext(context)

    const formatOptions: FormatOptions = {
        variables: { ...globalVariables, ...localVariables },
        functions: { ...globalFunctions, ...localFunctions},
        simplifiableUnits: unionArrays(localSimplifiableUnits, globalSimplifiableUnits),
        decimals: localDecimals || globalDecimals,
    }

    const equation = parse(value)
    const unitEquation = unit ? parse(unit) : null
    const result = resolve(equation, formatOptions)
    const unitResult = unitEquation ? resolve(unitEquation, formatOptions) : null
    const resultEquation = formatPreresolved(equation, unitEquation, result, unitResult, formatOptions)

    useImperativeHandle(ref, () => ({
        valid: resultEquation.type !== 'resolve-error' && resultEquation.type !== 'parser-error',
        equation,
        unitEquation,
        result,
        unitResult,
        resultEquation,
    }))

    return render(
        resultEquation,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
