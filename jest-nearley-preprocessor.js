var { Parser } = require('nearley/lib/nearley')
var compile = require('nearley/lib/compile')
var generate = require('nearley/lib/generate')
var { ParserRules, ParserStart } = require('nearley/lib/nearley-language-bootstrapped')

module.exports = {
    process: function (src) {
        var parser = new Parser(ParserRules, ParserStart)
        parser.feed(src)

        var compilation = compile(parser.results[0], {})
        return generate(compilation, 'Grammar').replace('module.exports ?= ?', 'module.exports={};module.exports.default=')
    }
}