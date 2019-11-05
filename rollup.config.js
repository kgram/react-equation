// import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

export default [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
            },
            {
                file: pkg.module,
                format: 'esm',
            },
        ],
        plugins: [
            resolve({
                extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
            }),
            babel({
                exclude: 'node_modules/**',
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
            }),
        ],
        watch: {
            chokidar: true,
        },
    },
]
