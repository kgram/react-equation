#------------------------------------------------------------------------------
# Entry
#------------------------------------------------------------------------------

main -> _ level6 _
        {% ([ ,value, ]) => value %}


#------------------------------------------------------------------------------
# Helpers
#------------------------------------------------------------------------------

@{% function nested(d) { return d[0][0] }%}

@{% function operator([a, ,operator, ,b]) { return {type: 'operator', operator, a, b }} %}

argList[X] -> $X (_ "," _ $X):*
        {% ([[first], rest]) => [first, ...rest.map((a) => a[3][0] )] %}

vector -> "[" _ argList[level5NoMatrix] _ "]"
        {% ([ , ,args, , ]) => args %}


#------------------------------------------------------------------------------
# Tree
#------------------------------------------------------------------------------

# level1-----------------------------------------------------------------------

operand -> number
        {% ([value]) => ({ type: 'number', value }) %}
    | name
        {% ([name]) => ({ type: 'variable', name }) %}

matrix -> vector
        {% ([values]) => ({ type: 'matrix', n: 1, m: values.length, values: values.map((v) => [v]) }) %}
    | "[" _ (vector _ {% id %}):+ "]"
        {% ([ , ,values, , ], location, reject) => {
            const m = values.length
            const n = values[0].length
            if (values.some((v) => v.length !== n)) {
                return reject
            }

            return {type: 'matrix', n, m, values }
        } %}

function -> name "(" _ argList[level5] _ ")"
        {% ([name, , ,args, , ]) => ({type: 'function', name, args }) %}

block -> "(" _ level5 _ ")"
        {% ([ , ,child, , ]) => ({ type: 'block', child }) %}

# level2-----------------------------------------------------------------------

exponent -> level1 _ "^" _ level2
        {% operator %}

# level3-----------------------------------------------------------------------

# Division separated from multiplication to ensure logical display using fractions. Mathemathically this makes no difference.
# Ensures "2*3/4" is grouped as "2 * 3/4" instead of "2*3 / 4" (the latter would require "(2*3)/4")
division -> level3 _ "/" _ level2
        {% operator %}

# level4-----------------------------------------------------------------------

multi -> level4 _ ("*" {% id %} | "**" {% id %}) _ level3
        {% operator %}

# level5-----------------------------------------------------------------------

addSub -> level5 _ [±+-] _ level4
        {% operator %}

negative -> "-" _ level4
        {% ([ , ,value]) => ({ type: 'negative', value }) %}

plusminus -> "±" _ level4
        {% ([ , ,value]) => ({ type: 'plusminus', value }) %}

# level6-----------------------------------------------------------------------

equals -> level6 _ "=" _ level5
        {% ([a, , , ,b]) => ({ type: 'equals', a, b }) %}


#------------------------------------------------------------------------------
# Groups
#------------------------------------------------------------------------------

level1 -> (operand | matrix | function | block)
        {% nested %}
level2 -> (operand | matrix | function | block | exponent)
        {% nested %}
level3 -> (operand | matrix | function | block | exponent | division)
        {% nested %}
level4 -> (operand | matrix | function | block | exponent | division | multi)
        {% nested %}
level5 -> (operand | matrix | function | block | exponent | division | multi | addSub | negative | plusminus)
        {% nested %}
level6 -> (operand | matrix | function | block | exponent | division | multi | addSub | negative | plusminus | equals)
        {% nested %}

# Used to ensure a matrix cannot be a direct child of a matrix
level5NoMatrix -> (operand | function | block | exponent | division | multi | addSub | negative | plusminus)
        {% nested %}


#------------------------------------------------------------------------------
# Base
#------------------------------------------------------------------------------

# Whitespace
_ -> [\s]:*
        {% () => null %}

integer -> [0-9]:+
        {% ([chars]) => parseInt(chars.join('')) %}

number -> integer
        {% id %}
    | integer "." integer
        {% ([integer, , fraction]) => parseFloat(`${integer}.${fraction}`) %}

letter -> [A-Za-z\u0391-\u03c9]
        {% id %}

alphanum -> letter
        {% id %}
    | [0-9]
        {% id %}

name -> letter alphanum:*
        {% ([first, chars]) => first + chars.join('') %}
