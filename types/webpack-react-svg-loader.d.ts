declare module '*.svg' {
    type Props = React.HTMLProps<HTMLDivElement> & {
        width?: number | string,
        height?: number | string,
    }
    function Svg(props: Props): JSX.Element

    // Hack to allow typescript to function
    namespace Svg {}

    export = Svg
}
