Selectors = require('../methods/Selectors')
Numeric = require('./Numeric')

class Boolean extends Numeric
  immutable: true

class Boolean::Methods extends Numeric::Methods
  "!=": (a, b) ->
    return a == b

  "==": (a, b) ->
    return a == b

  "<=": (a, b) ->
    return a <= b

  ">=": (a, b) ->
    return a >= b

  "<": (a, b) ->
    return a < b

  ">": (a, b) ->
    return a > b

for property, value of Selectors::
  Boolean::Methods::[property] = value

module.exports = Boolean