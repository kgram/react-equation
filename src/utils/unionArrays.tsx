export const unionArrays = <T extends any>(a: T[] | undefined, b: T[] | undefined): T[] | undefined => {
    if (!a) {
        return b
    } else if (!b) {
        return a
    } else {
        return [...a, ...b]
    }
}
