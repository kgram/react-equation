# `react-equation` – Parse, evaluate and render equation from plain text

A react render-layer for [`equation-parser`](https://github.com/kgram/equation-parser) and [`equation-resolver`](https://github.com/kgram/equation-resolver).


## Quick-start
Install the package.

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
import { Equation, EquationEvaluate, EquationContext, EquationOptions, defaultErrorHandler } from 'react-equation'
import { defaultVariables, defaultFunctions } from 'equation-resolver'

ReactDOM.render((
    <>
        <EquationOptions
            variables={defaultVariables}
            functions={defaultFunctions}
            errorHandler={defaultErrorHandler}
        >
            <EquationEvaluate
                value='5m + 1/2m * sin(π) + (22 m^2) / (2m)'
            />
            <EquationContext
                render={(equation) => (
                    <p>
                        Here, we define that {equation('a = 5')}, and can then evaluate that {equation('7 / a = ')}
                    </p>
                )}
            />
        </EquationOptions>
    </>
), document.getElementById("root"));
```

Some more example can be seen in this sandbox: https://codesandbox.io/s/react-equation-example-t0oe8

A simple playground built around `EquationContext` can be found here: https://codesandbox.io/s/react-equation-playground-w5q2en

## Introduction

This package is intended to render text-equations For help with equation structure, see [`equation-parser`](https://github.com/kgram/equation-parser#general-format).

### Equations in context
The most straight-forward way to render equations is to use the [`EquationContext`](#equationcontext) component. This component is made to render a series of interconnected equations and functions, evaluated in order, and will generally try to figure out what you want based on the form of the equation.

The `equation`-function provided to the `render`-prop allows you to render simple expressions, but also supports more complex patterns through a (hopefully) intuitive syntax:

* Evaluate an expression: By ending the equation with equals and optionally a placeholder (`_`) and unit, the evaluated result is shown.
    * `5 * 2 =`
    * `22/7=_`
    * `0.2m * 0.7m = _ cm^2`
* Assign a variable: By following a variable name with equals, the value will be available as a variable in all subsequent calls to `equation`. This can be combined with the evaluate-rules above to show the value of the variable.
    * `a = 5`
    * `b = 2a =`
    * `c = (100% + 2%)^3 = _ %`
* Assign a function: Assigning a function-call where every argument is a variable-name will make it available as a function for subsequent calls to `equation`. The function can use variables and functions as defined when it itself is defined.

If you need variables or functions defined without them being shown, you can simply call `equation` without using the return value.

### Direct rendered components
If you don't need context, or need more control over the components or bundling, you can use components directly. A component will only include the parser and evaluator when necessary, enabling efficient tree-shaking in simple scenarios.

### Variables and functions
It is necessary to manually include variables and functions. This is to allow changing the names for localization purposes, and omitting unnecessary code for bundle optimization.

The functions included can be found in [`equation-resolver`](https://github.com/kgram/equation-resolver#defaultfunctions). There is special rendering for `sqrt`, `root`, `abs` and `sum`.

The variables are only listed [in the raw source](https://github.com/kgram/equation-resolver/blob/master/src/defaultVariables.ts), since there's quite a few of them. They should hopefully cover anything one could want to define, but if something is missing or wrong, please create an issue.

## Components
All the included components are split up in the interest of allowing tree-shaking to reduce the bundle-size by avoiding either the parser, the resolver or both, depending on needs.

All the components can (when applicable) have props `variables`, `functions`, `simplifyableUnits` (see [`equation-resolver`](https://github.com/kgram/equation-resolver)), `errorHandler` (see section on error handling), `className` and `style`. These props can also be passed along through the `EquationOptions` context-provider.

### `Equation`
Parse the string provided as `value` and render it. No evaluation is done.

Exposes as ref:

```ts
type RefValue = {
    /** Equation is valid */
    valid: boolean,
    /** Parsed equation */
    equation: EquationNode | EquationParserError,
}
```

Example:

```jsx
<Equation
    value='2 + a'
/>
// Renders a prettified 2 + a
```

### `EquationEvaluate`
Parse the string provided as `value`, evaluate it and render the formatted equation.

Exposes as ref:

```ts
type RefValue = {
    /** Equation and result valid */
    valid: boolean,
    /** Parsed equation */
    equation: EquationNode | EquationParserError,
    /** Parsed equation for the display unit */
    unitEquation: EquationNode | EquationParserError | null,
    /** Evaluated result of the equation */
    result: ResultNode | ResultResolveError,
    /** Evaluated result of the unit passed */
    unitResult: ResultNode | ResultResolveError | null,
    /** Equation combined with result expressed as unit */
    resultEquation: EquationNode | EquationParserError | EquationResolveError | EquationRenderError,
}
```

Example:

```jsx
<EquationEvaluate
    value='2 + a'
    variables={{ a: { type: 'number', value: 5 }}}
/>
// Renders a prettified 2 + a = 7
```

### `EquationPreparsed`
Render a pre-parsed equation provided as `value`. No evaluation is done. This is mostly useful for building functionality on top of this library.

Example:

```jsx
<EquationPreparsed
    value={{ type: 'plus', a: { type: 'number', value: '2' }, b: { type: 'variable', name: 'a' } }}
/>
// Renders a prettified 2 + a
```

### `EquationEvaluatePreparsed`
Evaluate a pre-parsed equation provided as `value` and render the formatted equation. This is mostly useful for building functionality on top of this library.

Exposes as ref:

```ts
type RefValue = {
    /** Equation can be evaluated */
    valid: boolean,
    /** Evaluated result of the equation */
    result: ResultNode | ResultResolveError,
    /** Evaluated result of the unit passed */
    unitResult: ResultNode | ResultResolveError | null,
    /** Equation combined with result expressed as unit */
    resultEquation: EquationNode | EquationParserError | EquationResolveError,
}
```

Example:

```jsx
<EquationEvaluatePreparsed
    value={{ type: 'plus', a: { type: 'number', value: '2' }, b: { type: 'variable', name: 'a' } }}
    variables={{ a: { type: 'number', value: 5 }}}
/>
// Renders a prettified 2 + a = 7
```

### `EquationContext
Render multiple, interconnected equations, variables and functions. Variables
and functions can be defined by simply assigning them (`x=2`, `f(x)=x^2`), and
expressions are evalutaed by ending them on an equals-sign (`2*3=`). Force
conversion to a specific unit by ending on equals underscore-placeholder and the
unit (`25in = _cm`).

```tsx
<EquationContext render={(equation) => (
   <>
       {equation('a = 2')} Renders a = 2 and defines a
       {equation('b = 5a =')} Renders b = 5a = 10 and defines b
       {equation('c = 1/b = _ %')} Renders c = 1/b = 10% and defines c
       {equation('f(x) = x^2')} Renders f(x) = x^2 and defines f(x)
       {equation('2a + f(a) =')} Renders 2a + f(a) = 8
   </>
)} />
```

It is important to note, that since order matters, the equation-function from
this component should not be passed to other components. Instead, use
`EquationOptions` and the `getOptions` helper.

```tsx
<EquationContext render={(equation, getOptions) => (
   <>
       {equation('2x =')} Renders Unknown variable 'x'
       <EquationEvaluate value='2x' /> Renders Unknown variable 'x'

       {equation('x = 7')} Renders x = 7
       {equation('2x =')} Renders 2x = 14
       <EquationEvaluate value='2x' /> Renders Unknown variable 'x', not part of the context

       <EquationEvaluate value='2x' {...getOptions()} /> Renders 2x = 14
       <EquationOptions {...getOptions()}>
           <EquationEvaluate value='2x' /> Renders 2x = 14
       </EquationOptions>
   </>
)} />
```

## Error handling
An error handler should be added either to the `Equation`-components or to `EquationOptions`, otherwise the raw `errorType` of the error is shown. If english errors suffice, simply import `defaultErrorHandler`. If custom errors (for instance for localisation), see `./src/errorHandler.ts` for easy implementation.
