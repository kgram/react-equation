import * as React from 'react'

export default function RootSymbol({ height, style }: { height: number, style?: React.CSSProperties }) {
    height = Math.max(height, 1.4)
    return (
        <svg width='0.8em' style={style} viewBox={`0 0 0.8 ${height - 0.1}`}>
            <path d={buildPath(morphSvg(pathCommands, height))} />
        </svg>
    )
}

type SvgCommand = {
    c: string,
    v: number[],
}

function morphSvg(commands: SvgCommand[], height: number) {
    const offsetHeight = height - 1.4
    // Factors determined by experiment
    // Move top and inner elbow to keep the width of the long
    // line at ~0.5em
    const topOffsetFactor = 0.015 * Math.atan(offsetHeight * 1.25)
    const elbowFactor = 0.08 * Math.atan(offsetHeight * 0.556)
    return commands.map(({ c, v }, idx) => {
        // First point, anchor of top
        // Move full offset
        if (idx === 0) {
            return {
                c,
                v: [
                    v[0] - topOffsetFactor,
                    v[1],
                ],
            }
        // Second point, beizer
        // Move to keep round top
        } else if (idx === 1) {
            return {
                c,
                v: [
                    v[0] - topOffsetFactor * 0.75,
                    v[1],
                    v[2] - topOffsetFactor * 0.5,
                    v[3],
                ],
            }
        // Last point is inside elbow, should move up along short line
        } else if (idx === 18) {
            return {
                c,
                v: [
                    // Move along existing line
                    v[0] - elbowFactor * 0.416,
                    v[1] - elbowFactor * 0.909 + offsetHeight,
                ],
            }
        // Move other points down
        } else if (idx > 3) {
            return {
                c,
                v: v.map((value, valueIdx) => (
                    valueIdx % 2 === 0
                        ? value
                        : value + offsetHeight
                )),
            }
        }

        return { c, v }
    })
}

// Build path-string from commands
function buildPath(commands: SvgCommand[]) {
    return commands
        .map(({ c, v }) => c + v.join(' ')).join('')
}

// Commands used to draw a square root sign
const pathCommands = [
    { c: 'M', v: [0.7767, 0.014] },
    { c: 'Q', v: [0.7847, 0, 0.7967, 0] },
    { c: 'L', v: [0.8, 0] },
    { c: 'L', v: [0.8, 0.08] },
    { c: 'L', v: [0.351, 0.993] },
    { c: 'Q', v: [0.347, 1, 0.332, 1] },
    { c: 'Q', v: [0.323, 1, 0.32, 0.997] },
    { c: 'L', v: [0.126, 0.575] },
    { c: 'L', v: [0.11, 0.586] },
    { c: 'Q', v: [0.095, 0.598, 0.079, 0.61] },
    { c: 'T', v: [0.061, 0.622] },
    { c: 'Q', v: [0.057, 0.622, 0.048, 0.614] },
    { c: 'T', v: [0.038, 0.6] },
    { c: 'Q', v: [0.038, 0.597, 0.039, 0.596] },
    { c: 'Q', v: [0.041, 0.592, 0.106, 0.542] },
    { c: 'T', v: [0.173, 0.491] },
    { c: 'Q', v: [0.175, 0.489, 0.178, 0.489] },
    { c: 'Q', v: [0.185, 0.489, 0.19, 0.499] },
    { c: 'L', v: [0.3578, 0.8658] },
    { c: 'Z', v: [] },
]
