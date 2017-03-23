declare module 'react-height' {
    type Props = React.HTMLProps<HTMLDivElement> & {
        children?: JSX.Element
        onHeightReady: (height: number) => void,
        hidden?: boolean,
    }
    function ReactHeight(props: Props): JSX.Element

    // Hack to allow typescript to function
    namespace ReactHeight {}

    export = ReactHeight
}
