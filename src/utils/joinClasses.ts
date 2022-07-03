export const joinClasses = (a: string | undefined, b: string | undefined) => {
    if (a && b) return a + ' ' + b

    return a || b || undefined
}
