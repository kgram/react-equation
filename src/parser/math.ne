main -> _ equals _ {% function(d) {return d[1]} %}

equals -> add_sub {% id %}
    | equals _ "=" _ add_sub {% function(d) { return { type: 'equals', a: d[0], b: d[4] } } %}

argList -> add_sub {% function(d) { return [d[0]] } %}
    | argList _ "," _ add_sub {% function(d) { return [...d[0], d[4]] } %}

function -> operand {% id %}
    | matrix {% id %}
    | name "(" _ argList _ ")" {% function(d) {return {type: 'function', name: d[0], args: d[3] }} %}

# Parentheses
block -> function {% id %}
    | "(" _ add_sub _ ")" {% function(d) {return {type: 'block', child: d[2]}} %}

# Exponents
exponent -> block {% id %}
    | block _ "^" _ exponent    {% function(d) {return {type: 'operator', operator: d[2], a: d[0], b: d[4]}} %}

# Division
# Separated from multiplication to ensure logical display using fractions. Mathemathically this makes no difference.
# Ensures "2*3/4" is grouped as "2 * 3/4" instead of "2*3 / 4" (the latter would require "(2*3)/4")
division -> exponent {% id %}
    | division _ "/" _ exponent  {% function(d){ return {type: 'operator', operator:d[2], a: d[0], b: d[4]}} %}

# Multiplication and division
multi -> division {% id %}
    | multi _ ("*" {% id %} | "**" {% id %}) _ division  {% function(d){ return {type: 'operator', operator:d[2], a: d[0], b: d[4]}} %}

# Addition and subtraction
add_sub -> multi {% id %}
    | add_sub _ [±+-] _ multi {% function(d) { return {type: 'operator', operator:d[2], a: d[0], b: d[4]}} %}
    | "-" _ multi {% function(d) { return {type: 'negative', value: d[2]}} %}
    | "±" _ multi {% function(d) { return {type: 'plusminus', value: d[2]}} %}

matrix -> vector {% ([values]) => ({type: 'matrix', n: 1, m: values.length, values: values.map((v) => [v])}) %}
    | "[" _ (vector _ {% id %}):+ "]" {% ([,,values], location, reject) => {
        const m = values.length
        const n = values[0].length
        if (values.some((v) => v.length !== n)) {
            return reject
        }

        return {type: 'matrix', n, m, values }
    }%}

vector -> "[" _ argList _ "]" {% function(d) { return d[2] } %}

integer -> [0-9]:+        {% function(d) { return parseInt(d[0].join(''))} %}

number -> integer           {% id %}
    | integer "." integer   {% function(d) { return parseFloat(d.join(''))} %}

name -> letter alphanum:*  {% function(d) {return d[0] + d[1].join('')} %}

letter -> [A-Za-z\u0391-\u03c9] {% id %}

alphanum -> letter {% id %}
    | [0-9] {% id %}

operand -> number {% function(d) { return { type: 'number', value: d[0] } } %}
    | name {% function(d) { return { type: 'variable', name: d[0] } } %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% function(d) {return null } %}
