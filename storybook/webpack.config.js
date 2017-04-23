const path = require('path')
const combineLoaders = require('webpack-combine-loaders')

module.exports = {
    patch_require: true,
    devtool: 'source-map',
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
                    // Use babel to allow es2015 features (primarily arrow-functions and destructuring)
                    // It would be better to use typescript, but this does not work at the moment
                    {
                        loader: 'babel',
                        query: {
                            presets: ['es2015'],
                        },
                    }, {
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
