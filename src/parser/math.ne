#------------------------------------------------------------------------------
# Entry
#------------------------------------------------------------------------------

main -> _ level7 _ {% function(d) {return d[1]} %}

@{% function nested(d) { return d[0][0] }%}

#------------------------------------------------------------------------------
# Helpers
#------------------------------------------------------------------------------

argList[X] -> $X (_ "," _ $X):* {% function(d) { console.log('arglist', d); return [d[0][0], ...d[1].map((a) => a[3][0] )] } %}

vector -> "[" _ argList[level6NoMatrix] _ "]" {% function(d) { return d[2] } %}


#------------------------------------------------------------------------------
# Tree
#------------------------------------------------------------------------------

equals -> level7 _ "=" _ level6 {% function(d) { return { type: 'equals', a: d[0], b: d[4] } } %}

function -> name "(" _ argList[level6] _ ")" {% function(d) {return {type: 'function', name: d[0], args: d[3] }} %}

block -> "(" _ level6 _ ")" {% function(d) {return {type: 'block', child: d[2]}} %}

exponent -> level2 _ "^" _ level3    {% function(d) {return {type: 'operator', operator: d[2], a: d[0], b: d[4]}} %}

# Division separated from multiplication to ensure logical display using fractions. Mathemathically this makes no difference.
# Ensures "2*3/4" is grouped as "2 * 3/4" instead of "2*3 / 4" (the latter would require "(2*3)/4")
division -> level4 _ "/" _ level3  {% function(d){ return {type: 'operator', operator:d[2], a: d[0], b: d[4]}} %}

multi -> level5 _ ("*" | "**") _ level4  {% function(d){ return {type: 'operator', operator:d[2][0], a: d[0], b: d[4]}} %}

addSub -> level6 _ [±+-] _ level5 {% function(d) { return {type: 'operator', operator:d[2], a: d[0], b: d[4]}} %}

negative -> "-" _ level5 {% function(d) { return {type: 'negative', value: d[2]}} %}

plusminus -> "±" _ level5 {% function(d) { return {type: 'plusminus', value: d[2]}} %}

matrix -> vector {% ([values]) => ({type: 'matrix', n: 1, m: values.length, values: values.map((v) => [v])}) %}
    | "[" _ (vector _ {% id %}):+ "]" {% ([,,values], location, reject) => {
        const m = values.length
        const n = values[0].length
        if (values.some((v) => v.length !== n)) {
            return reject
        }

        return {type: 'matrix', n, m, values }
    }%}

operand -> number {% function(d) { return { type: 'number', value: d[0] } } %}
    | name {% function(d) { return { type: 'variable', name: d[0] } } %}


#------------------------------------------------------------------------------
# Groups
#------------------------------------------------------------------------------

level1 -> (operand | matrix | function) {% nested %}
level2 -> (operand | matrix | function | block) {% nested %}
level3 -> (operand | matrix | function | block | exponent) {% nested %}
level4 -> (operand | matrix | function | block | exponent | division) {% nested %}
level5 -> (operand | matrix | function | block | exponent | division | multi) {% nested %}
level6 -> (operand | matrix | function | block | exponent | division | multi | addSub | negative | plusminus) {% nested %}
level7 -> (operand | matrix | function | block | exponent | division | multi | addSub | negative | plusminus | equals) {% nested %}

level6NoMatrix -> (operand | function | block | exponent | division | multi | addSub | negative | plusminus) {% nested %}


#------------------------------------------------------------------------------
# Base
#------------------------------------------------------------------------------

# Whitespace
_ -> [\s]:*     {% function(d) {return null } %}

integer -> [0-9]:+        {% function(d) { return parseInt(d[0].join(''))} %}

number -> integer           {% id %}
    | integer "." integer   {% function(d) { return parseFloat(d.join(''))} %}

letter -> [A-Za-z\u0391-\u03c9] {% id %}

alphanum -> letter {% id %}
    | [0-9] {% id %}

name -> letter alphanum:*  {% function(d) {return d[0] + d[1].join('')} %}
