import abs from './abs'
import sum from './sum'

interface IRenderedEquation {
    elements: JSX.Element[],
    height: number,
    aboveMiddle: number,
    belowMiddle: number,
}

interface IEquationPart {
    type: any,
    props: any,
    children?: any,
    aboveMiddle: number,
    belowMiddle: number,
}

interface ILookup {
    [key: string]: (args: IRenderedEquation[]) => IEquationPart,
}

const lookup: ILookup = {
    abs,
    sum,
}

export default lookup
