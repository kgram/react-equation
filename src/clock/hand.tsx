import * as React from 'react'
import { default as moment, Moment } from 'moment'

interface IProps {
    length: number,
    width: number,
    color: string,
    progress: number,
}

export default class Hand extends React.PureComponent<IProps, null> {
    lastProgress: number | null = null

    shouldComponentUpdate(nextProps: IProps, nextState: null) {
        // Only update if a significant change in progress has happened since last render
        return this.lastProgress === null || Math.abs(this.lastProgress - nextProps.progress) > 0.0002
    }
    render() {
        const {length, width, color, progress } = this.props
        // Save reference to progress to avoid constant miniscule changes
        this.lastProgress = progress
        return (
            <div
                style={{
                    width,
                    height: length,
                    backgroundColor: color,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'top',
                    transform: `translate(-50%, 0) rotate(${360 * progress + 180}deg) translate(0, -${width / 2}px)`,
                    borderRadius: width / 2,
                }}
                />
        )
    }
}