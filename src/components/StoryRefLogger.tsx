import React from 'react'
import { action } from '@storybook/addon-actions'

type Props = {
    render: (ref: React.MutableRefObject<any>) => JSX.Element,
}

export const RefLogger = ({ render }: Props) => {
    const ref = React.useRef<any>()

    return (
        <div>
            <div>{render(ref)}</div>
            <button onClick={() => action('ref')(ref.current)}>Log ref</button>
        </div>
    )
}
