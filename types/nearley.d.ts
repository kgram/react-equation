declare module 'nearley' {
    export type ParserRules = {}
    export type ParserStart = {}

    export type Grammar = {
        ParserRules: ParserRules,
        ParserStart: ParserStart,
    }

    class Parser<T> {
        constructor(rules: ParserRules, start: ParserStart)

        feed(input: string): { results: [T] }
    }

    export { Parser }
}
