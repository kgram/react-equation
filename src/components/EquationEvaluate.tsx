import { forwardRef, memo, Ref, useImperativeHandle } from 'react'

import { EquationNode, EquationParserError, parse } from 'equation-parser'
import { resolve, formatPreresolved, wrapError, FormatOptions, ResultNode, ResultResolveError, EquationResolveError } from 'equation-resolver'

import { EquationRenderError } from '../types/EquationRenderError'

import { joinClasses } from '../utils/joinClasses'
import { render }  from '../rendering'
import { getError } from '../errorHandler'

import { useEquationOptions }  from './useEquationOptions'
import { RenderOptions }  from '../types/RenderOptions'

export type Props = FormatOptions & RenderOptions & {
    /** Equation as text */
    value: string,
    /** Optionally provide a unit to convert the result into */
    unit?: string,
    /** Variables expressed as strings, evaluated as equations in their own right */
    variablesEvaluated?: Record<string, string>,

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
    resultEquation: EquationNode | EquationParserError | EquationResolveError | EquationRenderError,
}

export const EquationEvaluate = memo(forwardRef(({
    value,
    errorHandler: localErrorHandler,
    className,
    style,
    unit,
    variables: localVariables,
    functions: localFunctions,
    simplifiableUnits: localSimplifiableUnits,
    decimals: localDecimals,
    variablesEvaluated = {},
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

    const errorHandler = { ...errorHandlerGlobal, ...localErrorHandler }

    const functions = { ...globalFunctions, ...localFunctions}
    let variableError: [string, ResultResolveError] | undefined
    const variables = Object.entries(variablesEvaluated).reduce((current, [name, equation]) => {
        const result = resolve(parse(equation), { functions, variables: current })

        if (result.type !== 'resolve-error') {
            current[name] = result
        } else if (!variableError) {
            variableError = [name, result]
        }

        return current
    }, { ...globalVariables, ...localVariables })

    const formatOptions: FormatOptions = {
        variables,
        functions,
        simplifiableUnits: unionArrays(localSimplifiableUnits, globalSimplifiableUnits),
        decimals: localDecimals || globalDecimals,
    }

    const equation = parse(value)
    const unitEquation = unit ? parse(unit) : null
    const unitResult = unitEquation ? resolve(unitEquation, formatOptions) : null
    const result = variableError ? variableError[1] : resolve(equation, formatOptions)
    const resultEquation = variableError && equation.type !== 'parser-error'
        ? {
            type: 'render-error',
            errorType: 'variableResolution',
            node: wrapError(equation, unitEquation?.type === 'parser-error' ? null : unitEquation),
            name: variableError[0],
            errorMessage: getError(variableError[1], errorHandler),
        } as EquationRenderError
        : formatPreresolved(equation, unitEquation, result, unitResult, formatOptions)

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
            errorHandler,
            className: joinClasses(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}))
