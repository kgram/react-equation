# `react-equation` – Parse, evaluate and render equation from plain text

A react render-layer for [`equation-parser`](https://github.com/kgram/equation-parser) and [`equation-resolver`](https://github.com/kgram/equation-resolver).


## Quick-start
Install the package. Optionally add `equation-resolver` as a direct dependency, if you want functions and variables.
```
npm install -S react-equation equation-resolver
```
or
```
yarn add react-equation equation-resolver
```

Start rendering equations

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from 'react-equation'
import { defaultVariables, defaultFunctions } from 'equation-resolver'

ReactDOM.render((
    <>
        <EquationOptions
            variables={defaultVariables}
            functions={defaultFunctions}
            errorHandler={defaultErrorHandler}
        >
            <Equation
                value='5m + 1/2m * sin(π) + (22 m^2) / (2m)'
            />
            <EquationEvaluate
                value='5m + 1/2m * sin(π) + (22 m^2) / (2m)'
            />
        </EquationOptions>
    </>
), document.getElementById("root"));
```

More in-depth examples: https://codesandbox.io/s/react-equation-example-t0oe8

## Components
All the included components are split up in the interest of allowing tree-shaking to reduce the bundle-size by avoiding either the parser, the resolver or both, depending on needs.

All the components can have `variables`, `functions`, `simplifyableUnits`, `errorHandler`, `className` and `style`. These props can also be passed along through the `EquationOptions` context-provider.

### `Equation`
Parse the string provided as `value` and render it. No evaluation is done.

Example:

```jsx
<Equation
    value='2 + a'
/>
// Renders a prettified 2 + a
```

### `EquationEvaluate`
Parse the string provided as `value`, evaluate it and render the formatted equation.

Example:

```jsx
<EquationEvaluate
    value='2 + a'
    variables={{ a: { type: 'number', value: 5 }}}
/>
// Renders a prettified 2 + a = 7
```

### `EquationPreparsed`
Render a pre-parsed equation provided as `value`. No evaluation is done.

Example:

```jsx
<EquationPreparsed
    value={{ type: 'plus', a: { type: 'number', value: '2' }, b: { type: 'variable', name: 'a' } }}
/>
// Renders a prettified 2 + a
```

### `EquationEvaluatePreparsed`
Evaluate a pre-parsed equation provided as `value` and render the formatted equation.

Example:

```jsx
<EquationEvaluatePreparsed
    value={{ type: 'plus', a: { type: 'number', value: '2' }, b: { type: 'variable', name: 'a' } }}
    variables={{ a: { type: 'number', value: 5 }}}
/>
// Renders a prettified 2 + a = 7
```

## Error handling
An error handler should be added either to the `Equation`-components or to `EquationOptions`, otherwise the raw `errorType` of the error is shown. If english errors suffice, simply import `defaultErrorHandler`. If custom errors (for instance for localisation), see `./src/errorHandler.ts` for easy implementation.
