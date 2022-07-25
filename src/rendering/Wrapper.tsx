import React, { CSSProperties, ReactNode } from 'react'

type Props = {
    children?: ReactNode,
    height?: number,
    className?: string,
    style?: CSSProperties,
}

export const Wrapper = ({ children, height, className, style } : Props) => (

    <span
        className={className}
        style={{
            display: 'inline-block',
            // Allow style override of `display`, but not of `lineHeight` and `height`, since this will mess up the height of everything
            ...style,
            height: height ? `${height}em` : undefined,
            lineHeight: 1.4 }}
    >
        {children}
    </span>
)
