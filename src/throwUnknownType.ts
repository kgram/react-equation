/**
 * Compiler-error and runtime-error on unhandled type
 *
 * @param typed: Object with type-property
 * @param getMessage: get an error message for runtime errors
 */
export function throwUnknownType(typed: never, getMessage: (type: string) => string): never;
export function throwUnknownType(typed: { type: string }, getMessage: (type: string) => string) {
    throw new Error(getMessage((typed && typed.type) || 'unknown'))
}
