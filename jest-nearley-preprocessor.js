var { Parser } = require('nearley/lib/nearley')
var compile = require('nearley/lib/compile')
var generate = require('nearley/lib/generate')
var { ParserRules, ParserStart } = require('nearley/lib/nearley-language-bootstrapped')

var babelPreprocessor = require('babel-jest')

function parseNearley(src) {
    var parser = new Parser(ParserRules, ParserStart)
    parser.feed(src)

    var compilation = compile(parser.results[0], {})
    return generate(compilation, 'Grammar').replace('module.exports ?= ?', 'module.exports={};module.exports.default=')
}

module.exports = {
    process: function (src, filename, config) {
        const jsSrc = parseNearley(src)

        return babelPreprocessor.process(jsSrc, filename.replace(/\.ne$/, '.js', config))
    }
}
