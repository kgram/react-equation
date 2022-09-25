import React from 'react'

import {
    resolve,
    createResolverFunction,
    format,
    FormatOptions,
    formatPreresolved,
} from 'equation-resolver'
import { parse, EquationNodeVariable, EquationNode, EquationParserError } from 'equation-parser'

import { RenderOptions } from '../../types/RenderOptions'
import { useEquationOptions } from '../useEquationOptions'
import { EquationPreparsed } from '../EquationPreparsed'
import { unionArrays } from '../../utils/unionArrays'
import { isEqualPlaceholder } from './isEqualPlaceholder'
import { isComparison } from './isComparison'

type Helpers = {
    /**
     * Render an equation without evaluation
     *
     * @example
     * ```js
     * <EquationContext render={({ equation }) => (
     *    <>
     *        {equation('1 + 2')} Renders 1 + 2
     *    </>
     * )} />
     * ```
     */
    equation: (equation: string) => JSX.Element,
    /**
     * Evaluate an equation, and render equation and result
     *
     * @example
     * ```js
     * <EquationContext render={({ evaluate }) => (
     *    <>
     *        {evaluate('1 + 2')} Renders 1 + 2 = 3
     *    </>
     * )} />
     * ```
     */
    evaluate: (equation: string, options?: { unit?: string, decimals?: FormatOptions['decimals'] }) => JSX.Element,
    /**
     * Define a variable, and render name, definition and, optionally, the
     * result of evaluation. The variable can be referenced in later equations.
     *
     * @example
     * ```js
     * <EquationContext render={({ variable, evaluate }) => (
     *    <>
     *        {variable('a', '1 + 2')} Renders a = 1 + 2
     *        {variable('b', '2a', { showResult: true })} Renders b = 2a = 6
     *        {evaluate('3a + 2b')} Renders 3a + 2b = 21
     *        {evaluate('3a + 2b', { unit: 'a' })} Renders 3a + 2b = 7a
     *    </>
     * )} />
     * ```
     */
    variable: (name: string, equation: string, options?: { showResult?: boolean, unit?: string, decimals?: FormatOptions['decimals'] }) => JSX.Element,
    /**
     * Define a function, and render signature and definition. The function can
     * be referenced in later equations.
     *
     * @example
     * ```jsx
     * <EquationContext render={({ func, evaluate }) => (
     *    <>
     *        {func('f(x)', '2x^2 + 5x + 3')} Renders f(x) = 2x^2 + 5x + 3
     *        {evaluate('f(3)')} Renders f(3) = 36
     *    </>
     * )} />
     * ```
     */
    func: (signature: string, equation: string) => JSX.Element,
    /**
     * Render equation and automatically figure out evaluation, and if it's a
     * variable or a function. Both expressions and variables can be evaluated
     * by ending the equation with `=` or `= _` (equals placeholder).
     *
     * You can optionally force a unit by including it after the placeholder
     * (`= _ mm` forces a result in millimeters).
     *
     * @example
     * ```js
     * <EquationContext render={({ expression }) => (
     *    <>
     *        {expression('a = 2')} Renders a = 2 and defines a
     *        {expression('b = 5a =')} Renders b = 5a = 10 and defines b
     *        {expression('c = 1/b = _ %')} Renders c = 1/b = 10% and defines c
     *        {expression('f(x) = x^2')} Renders f(x) = x^2 and defines f(x)
     *        {expression('2a + f(a) =')} Renders 2a + f(a) = 8
     *    </>
     * )} />
     * ```
     */
    expression: (equation: string) => JSX.Element,
    /**
     * Get current context for passing to other child components. This is
     * necessary if variables or functions should be used in any nested
     * components.
     *
     * @example
     * ```jsx
     * <EquationContext render={({ variable, evaluate, getOptions }) => (
     *    <>
     *        {evaluate('2x')} Renders Unknown variable 'x'
     *        <EquationEvaluate value='2x' /> Renders Unknown variable 'x'
     *
     *        {variable('x', '7')} Renders x = 7
     *        {evaluate('2x')} Renders 2x = 14
     *        <EquationEvaluate value='2x' /> Renders Unknown variable 'x'
     *
     *        <EquationOptions {...getOptions()}>
     *            <EquationEvaluate value='2x' /> Renders 2x = 14
     *        </EquationOptions>
     *    </>
     * )} />
     * ```
     */
    getOptions: () => FormatOptions & RenderOptions,
}

type Props = Pick<FormatOptions, 'variables' | 'functions' | 'simplifiableUnits'> & Pick<RenderOptions, 'errorHandler'> & {
    render: (helpers: Helpers) => JSX.Element | null,
}

/**
 * Render multiple, interconnected equations, variables and functions.
 *
 * It is important to note, that since order matters, the helper-functions for
 * this component should not be passed to other components. Instead, use
 * `EquationOptions` and the `getOptions` helper.
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

    const equation: Helpers['equation'] = (equation) => {
        const node = parse(equation)

        return <EquationPreparsed value={node} errorHandler={errorHandler} />
    }

    const evaluate: Helpers['evaluate'] = (equation, { unit, decimals = globalDecimals } = {}) => {
        const node = format(
            parse(equation),
            unit ? parse(unit) : null,
            {
                decimals,
                functions,
                variables,
                simplifiableUnits,
            },
        )

        return <EquationPreparsed value={node} errorHandler={errorHandler} />
    }

    const variable: Helpers['variable'] = (name, equation, { showResult = false, unit, decimals } = {}) => {
        const parsed = parse(equation)
        const parsedName = parse(name)

        if (parsed.type === 'parser-error') {
            return (
                <EquationPreparsed
                    value={{
                        ...parsed,
                        equation: name + ' = ' + equation,
                        start: parsed.start + name.length + 3,
                        end: parsed.end + name.length + 3,
                    }}
                    errorHandler={errorHandler}
                />
            )
        }

        if (parsedName.type !== 'variable') {
            return (
                <EquationPreparsed
                    value={{
                        type: 'render-error',
                        errorType: 'variableNaming',
                        name,
                        node: {
                            type: 'equals',
                            a: { type: 'operand-placeholder' },
                            b: parsed,
                        },
                    }}
                    errorHandler={errorHandler}
                />
            )
        }
        const parsedUnit = unit ? parse(unit) : null
        const result = resolve(parsed, { functions, variables })
        const resultUnit = parsedUnit ? resolve(parsedUnit, { functions, variables }) : null
        if (result.type !== 'resolve-error') {
            variables[parsedName.name] = result
        }

        const innerNode: EquationNode | EquationParserError = {
            type: 'equals',
            a: parsedName,
            b: parsed,
        }

        const node = showResult
            ? formatPreresolved(
                innerNode,
                parsedUnit,
                result,
                resultUnit,
                { decimals, simplifiableUnits },
            )
            : innerNode

        return <EquationPreparsed value={node} errorHandler={errorHandler} />
    }

    const func: Helpers['func'] = (signature, equation) => {
        const parsed = parse(equation)
        const parsedSignature = parse(signature)

        if (parsed.type === 'parser-error') {
            return (
                <EquationPreparsed
                    value={{
                        ...parsed,
                        equation: signature + ' = ' + equation,
                        start: parsed.start + signature.length + 3,
                        end: parsed.end + signature.length + 3,
                    }}
                    errorHandler={errorHandler}
                />
            )
        }

        if (parsedSignature.type !== 'function' || !parsedSignature.args.every((arg): arg is EquationNodeVariable => arg.type === 'variable')) {
            return (
                <EquationPreparsed
                    value={{
                        type: 'render-error',
                        errorType: 'functionSignature',
                        signature,
                        node: {
                            type: 'equals',
                            a: { type: 'operand-placeholder' },
                            b: parsed,
                        },
                    }}
                    errorHandler={errorHandler}
                />
            )
        }

        functions[parsedSignature.name] = createResolverFunction(parsedSignature.args.map((arg) => arg.name), parsed, { variables, functions })

        return (
            <EquationPreparsed
                value={{
                    type: 'equals',
                    a: parsedSignature,
                    b: parsed,
                }}
                errorHandler={errorHandler}
            />
        )
    }

    const expression: Helpers['expression'] = (equation) => {
        // Inject placeholder if equation ends in equals
        const node = parse(/=\s*$/.test(equation) ? equation + '_' : equation)
        console.log(node)
        if (node.type === 'parser-error') {
            return <EquationPreparsed value={node} errorHandler={errorHandler} />
        }

        if (
            node.type === 'equals' &&
            node.a.type === 'function' &&
            node.a.args.every((arg) => arg.type === 'variable')
        ) {
            const { name, args } = node.a
            functions[name] = createResolverFunction(args.map((arg) => (arg as EquationNodeVariable).name), node.b, { variables, functions })

            return <EquationPreparsed value={node} errorHandler={errorHandler} />
        }

        if (
            node.type === 'equals' &&

            node.a.type === 'variable' &&
            (!isComparison(node.b) || isEqualPlaceholder(node.b))
        ) {
            const { a: variable, b } = node
            const showResult = isEqualPlaceholder(b)
            const equation = showResult ? b.a : b

            console.log({ node, equation, showResult })
            const result = resolve(equation, { variables, functions })
            if (result.type !== 'resolve-error') {
                variables[variable.name] = result
            }
            if (showResult) {
                const unit = b.b.type === 'operand-placeholder' ? null : b.b.b
                const unitResolved = unit ? resolve(unit, { variables, functions }) : null
                const formatted = formatPreresolved(
                    equation,
                    b.b.type === 'operand-placeholder' ? null : b.b.b,
                    result,
                    unitResolved,
                    { decimals: globalDecimals, simplifiableUnits },
                )

                console.log({ node, equation, result, unit, unitResolved })

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
    }

    const getOptions: Helpers['getOptions'] = () => ({
        ...options,
        decimals: globalDecimals,
        variables: { ...variables },
        functions: { ...functions },
        simplifiableUnits,
    })

    return render({ equation, evaluate, variable, func, expression, getOptions })
}
