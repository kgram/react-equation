declare module '*.ne' {
    import { Grammar } from 'nearley'

    const grammar: Grammar
    export default grammar
}
