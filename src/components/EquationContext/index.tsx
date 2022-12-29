import React from 'react'

import {
    resolve,
    createResolverFunction,
    format,
    FormatOptions,
    formatPreresolved,
} from 'equation-resolver'
import { parse, EquationNodeVariable } from 'equation-parser'

import { RenderOptions } from '../../types/RenderOptions'
import { useEquationOptions } from '../useEquationOptions'
import { EquationPreparsed } from '../EquationPreparsed'
import { unionArrays } from '../../utils/unionArrays'
import { isEqualPlaceholder } from './isEqualPlaceholder'
import { isComparison } from './isComparison'

type Props = Pick<FormatOptions, 'variables' | 'functions' | 'simplifiableUnits'> & Pick<RenderOptions, 'errorHandler'> & {
    /**
     * Render content with equations interspersed.
     */
    render: (
        equation: (value: string) => JSX.Element,
        getOptions: () => FormatOptions & RenderOptions,
    ) => JSX.Element | null,
}

/**
 * Render multiple, interconnected equations, variables and functions. Variables
 * and functions can be defined by simply assigning them (`x=2`, `f(x)=x^2`), and expressions are
 * evalutaed by ending them on an equals-sign (`2*3=`). Force conversion to a specific
 * unit by ending on equals underscore-placeholder and the unit (`25in = _cm`).
 *
 * @example
 * ```tsx
 * <EquationContext render={(equation) => (
 *    <>
 *        {equation('a = 2')} Renders a = 2 and defines a
 *        {equation('b = 5a =')} Renders b = 5a = 10 and defines b
 *        {equation('c = 1/b = _ %')} Renders c = 1/b = 10% and defines c
 *        {equation('f(x) = x^2')} Renders f(x) = x^2 and defines f(x)
 *        {equation('2a + f(a) =')} Renders 2a + f(a) = 8
 *    </>
 * )} />
 * ```
 *
 * It is important to note, that since order matters, the equation-function from
 * this component should not be passed to other components. Instead, use
 * `EquationOptions` and the `getOptions` helper.
 *
 * @example
 * ```tsx
 * <EquationContext render={(equation, getOptions) => (
 *    <>
 *        {equation('2x =')} Renders Unknown variable 'x'
 *        <EquationEvaluate value='2x' /> Renders Unknown variable 'x'
 *
 *        {equation('x = 7')} Renders x = 7
 *        {equation('2x =')} Renders 2x = 14
 *        <EquationEvaluate value='2x' /> Renders Unknown variable 'x', not part of the context
 *
 *        <EquationEvaluate value='2x' {...getOptions()} /> Renders 2x = 14
 *        <EquationOptions {...getOptions()}>
 *            <EquationEvaluate value='2x' /> Renders 2x = 14
 *        </EquationOptions>
 *    </>
 * )} />
 * ```
 */
export const EquationContext = ({
    render,
    errorHandler,
    variables: localVariables,
    functions: localFunctions,
    simplifiableUnits: localSimplifiableUnits,
}: Props) => {
    const {
        variables: globalVariables,
        functions: globalFunctions,
        simplifiableUnits: globalSimplifiableUnits,
        decimals: globalDecimals,
        ...options
    } = useEquationOptions()

    const functions = { ...globalFunctions, ...localFunctions}
    const variables = { ...globalVariables, ...localVariables}
    const simplifiableUnits = unionArrays(localSimplifiableUnits, globalSimplifiableUnits)

    return render(
        (equation) => {
            // Inject placeholder if equation ends in equals
            const node = parse(/=\s*$/.test(equation) ? equation + '_' : equation)
            // Handle parser-error early
            if (node.type === 'parser-error') {
                return <EquationPreparsed value={node} errorHandler={errorHandler} />
            }

            // Handle function assignment
            if (
                node.type === 'equals' &&
                node.a.type === 'function' &&
                node.a.args.every((arg) => arg.type === 'variable')
            ) {
                const { name, args } = node.a
                // Add the function to the context
                functions[name] = createResolverFunction(args.map((arg) => (arg as EquationNodeVariable).name), node.b, { variables, functions })

                return <EquationPreparsed value={node} errorHandler={errorHandler} />
            }

            // Handle variable assignment
            if (
                node.type === 'equals' &&
                node.a.type === 'variable' &&
                (!isComparison(node.b) || isEqualPlaceholder(node.b))
            ) {
                const { a: variable, b } = node
                const showResult = isEqualPlaceholder(b)
                const equation = showResult ? b.a : b

                const result = resolve(equation, { variables, functions })
                // Add the variable to the context
                if (result.type !== 'resolve-error') {
                    variables[variable.name] = result
                }
                if (showResult) {
                    const unitResolved = b.b.type === 'operand-placeholder'
                        ? null
                        : resolve(b.b.b, { variables, functions })
                    const formatted = formatPreresolved(
                        equation,
                        b.b.type === 'operand-placeholder' ? null : b.b.b,
                        result,
                        unitResolved,
                        { decimals: globalDecimals, simplifiableUnits },
                    )

                    switch (formatted.type) {
                        case 'parser-error': return (
                            <EquationPreparsed value={formatted} errorHandler={errorHandler} />
                        )
                        case 'resolve-error': return (
                            <EquationPreparsed value={{ ...formatted, node: { type: 'equals', a: variable, b: formatted.node } }} errorHandler={errorHandler} />
                        )
                        default: return (
                            <EquationPreparsed value={{ type: 'equals', a: variable, b: formatted }} errorHandler={errorHandler} />
                        )
                    }
                } else {
                    return <EquationPreparsed value={node} errorHandler={errorHandler} />
                }
            }

            if (isEqualPlaceholder(node)) {
                const unit = node.b.type === 'operand-placeholder' ? null : node.b.b
                const formatted = format(node.a, unit, { variables, functions, simplifiableUnits, decimals: globalDecimals })

                return <EquationPreparsed value={formatted} errorHandler={errorHandler} />
            }

            return <EquationPreparsed value={node} errorHandler={errorHandler} />
        },
        () => ({
            ...options,
            decimals: globalDecimals,
            variables: { ...variables },
            functions: { ...functions },
            simplifiableUnits,
        }),
    )
}
