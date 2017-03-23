declare module 'react-mathjax' {
    export function Context(props: { children?: JSX.Element }): JSX.Element
    export function Node(props: { children?: JSX.Element, inline: boolean }): JSX.Element
}