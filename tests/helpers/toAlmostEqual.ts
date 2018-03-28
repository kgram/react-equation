import { isEqualWith, isNumber } from 'lodash'
import { matcherHint,printExpected, printReceived } from 'jest-matcher-utils'
import diff from 'jest-diff'

expect.extend({
    toAlmostEqual(received, expected) {
        const pass = isEqualWith(received, expected, (a, b) => {
            if (isNumber(a) && isNumber(b)) {
                return Math.abs(a - b) < Math.max(Math.abs(a), Math.abs(b)) / 1e10
            }
        });
        // Copied from jest 'toEqual'
        const message = pass
            ? () =>
                matcherHint('.not.toAlmostEqual') +
                '\n\n' +
                `Expected value to not closely equal:\n` +
                `  ${printExpected(expected)}\n` +
                `Received:\n` +
                `  ${printReceived(received)}`
            : () => {
                const diffString = diff(expected, received, { expand: false });
                return (
                matcherHint('.toAlmostEqual') +
                '\n\n' +
                `Expected value to closely equal:\n` +
                `  ${printExpected(expected)}\n` +
                `Received:\n` +
                `  ${printReceived(received)}` +
                (diffString ? `\n\nDifference:\n\n${diffString}` : '')
            )
        }
        // Passing the the actual and expected objects so that a custom reporter
        // could access them, for example in order to display a custom visual diff,
        // or create a different error message
        return { actual: received, expected, message, name: 'toAlmostEqual', pass }
    },
})

declare namespace jest {
    interface Matchers {
        toAlmostEqual: (received: any, expected: any) => { pass: boolean, message (): string, }
    }
}
