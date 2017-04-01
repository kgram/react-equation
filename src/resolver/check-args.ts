import { EquationTree } from '../types'

export default function checkArgs(name: string, args: EquationTree[], minArgs: number, maxArgs: number) {
    if (args.length < minArgs || args.length > maxArgs) {
        if (minArgs === maxArgs) {
            throw new Error(`Equation resolve: function "${name}" takes ${minArgs} arguments, not ${args.length}`)
        } else {
            throw new Error(`Equation resolve: function "${name}" takes ${minArgs}-${maxArgs} arguments, not ${args.length}`)
        }
    }
}