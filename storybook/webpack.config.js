const path = require('path')
const combineLoaders = require('webpack-combine-loaders')

module.exports = {
    patch_require: true,
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        root: [
            path.resolve('../src'),
            path.resolve('../types'),
        ]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.css$/,
                loader: combineLoaders([
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[path][name]_[local]',
                            camelCase: true,
                        }
                    }
                ]),
            }, {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: 'string-replace',
                        query: {
                            search: 'module.exports ?= ?',
                            replace: 'module.exports={};module.exports.default=',
                            flags: '',
                        },
                    }, {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[path][name]_[local]',
                            camelCase: true,
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                ]),
            }, {
                test: /\.ne$/,
                loader: combineLoaders([
                    {
                        loader: 'string-replace',
                        query: {
                            search: 'module.exports ?= ?',
                            replace: 'module.exports={};module.exports.default=',
                            flags: '',
                        },
                    }, {
                        loader: 'nearley',
                    }
                ]),
            },
        ],
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
}
