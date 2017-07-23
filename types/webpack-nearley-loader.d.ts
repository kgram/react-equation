declare module '*.ne' {
    import { ParserRules as ParserRulesType, ParserStart as ParserStartType } from 'nearley'

    export const ParserRules: ParserRulesType
    export const ParserStart: ParserStartType
}
