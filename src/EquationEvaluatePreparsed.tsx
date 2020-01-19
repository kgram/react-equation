import { useContext } from 'react'
import classnames from 'classnames'
import { EquationNode, EquationParserError } from 'equation-parser'
import { format, FormatOptions } from 'equation-resolver'

import { render }  from './render'
import { context }  from './context'
import { RenderOptions }  from './RenderOptions'

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

export const EquationEvaluatePreparsed = ({
    value,
    errorHandler,
    className,
    style,
    unit,
    variables: localVariables,
    functions: localFunctions,
    simplifiableUnits: localSimplifiableUnits,
}: Props) => {
    const {
        errorHandler: errorHandlerGlobal,
        className: classNameGlobal,
        style: styleGlobal,

        variables: globalVariables,
        functions: globalFunctions,
        simplifiableUnits: globalSimplifiableUnits,
    } = useContext(context)

    const tree = format(value, unit, {
        variables: { ...globalVariables, ...localVariables },
        functions: { ...globalFunctions, ...localFunctions},
        simplifiableUnits: unionArrays(localSimplifiableUnits, globalSimplifiableUnits),
    })

    return render(
        tree,
        {
            errorHandler: { ...errorHandlerGlobal, ...errorHandler },
            className: classnames(classNameGlobal, className),
            style: { ...styleGlobal, ...style },
        },
    )
}
