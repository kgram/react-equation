const path = require('path')

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: 'module.exports ?= ?',
                            replace: 'module.exports={};module.exports.default=',
                            flags: '',
                        },
                    },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            getLocalIdent: (loaderContext, localIdentName, localName) => {
                                const requestPath = path.relative(srcPath, loaderContext.resourcePath)
                                return requestPath
                                    // Use - instead of /
                                    .replace(/\//g, '_')
                                    // Strip file-name
                                    .replace(/\.scss$/, '')
                                    // Strip default file-name
                                    .replace(/-style$/, '') +
                                    '_' + localName
                            },
                            camelCase: true,
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                ],
            },
            {
                test: /\.ne$/,
                loaders: [
                    // Use babel to allow es2015 features (primarily arrow-functions and destructuring)
                    // It would be better to use typescript, but this does not work at the moment
                    {
                        loader: 'babel-loader',
                    }, {
                        loader: 'nearley-loader',
                    }
                ],
            },
        ],
    },
}
