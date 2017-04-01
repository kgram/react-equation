import { EquationTree } from './equation-tree'
import { ResultTree } from './result-tree'
import VariableLookup from './variable-lookup'
import FunctionLookup from './function-lookup'

type ResolverFunction = (name: string, args: EquationTree[], variables: VariableLookup, functions: FunctionLookup) => ResultTree

export default ResolverFunction
