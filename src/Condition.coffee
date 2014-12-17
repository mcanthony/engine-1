Query = require('./Query')

class Condition extends Query
  type: 'Condition'
  
  signature: [
  	if: ['Query', 'Selector', 'Variable', 'Constraint', 'Default'],
  	then: ['Any'], 
  	[
  		else: ['Any']
  	]
  ]

  cleaning: true

  conditional: 1
  boundaries: true
  domains:
    1: 'solved'

  constructor: (operation, engine) ->
    @path = @key = @serialize(operation, engine)

    if @linked
      if parent = operation.parent
        previous = parent[parent.indexOf(operation) - 1]
        if command = previous.command
          if command.type == 'Condition'
            command.next = operation
            @previous = command

  # Condition was not evaluated yet
  descend: (engine, operation, continuation, scope) ->
    continuation = @delimit(continuation, @DESCEND)

    if @conditional
      path = continuation + @key
      unless engine.queries.hasOwnProperty(path)
        engine.queries[path] = 0
        branch = operation[@conditional]
        branch.command.solve(engine, branch, continuation, scope)
        
      @after([], engine.queries[path], engine, operation, continuation, scope)
        
    return false

  execute: (value) ->
    return value

  serialize: (operation, engine) ->
    return '@' + @toExpression(operation[1])

  ascend: (engine, operation, continuation, scope, result) ->
    if conditions = (engine.updating.branches ||= [])
      if engine.indexOfTriplet(conditions, operation, continuation, scope) == -1
        conditions.push(operation, continuation, scope)

  rebranch: (engine, operation, continuation, scope) ->
    old = engine.updating.collections?[continuation] ? 0
    console.log('rebranch', old)
    increment = if old < 0 || 1 / old == -Infinity then 1 else -1
    engine.queries[continuation] = (engine.queries[continuation] || 0) + increment

    inverted = operation[0] == 'unless'
    index = @conditional + 1 + ((increment == -1) ^ inverted)

    if branch = operation[index]
      engine.console.group '%s \t\t\t\t%o\t\t\t%c%s', (index == 2 && 'if' || 'else') + @DESCEND, operation[index], 'font-weight: normal; color: #999', continuation
      domain = (engine.document || engine.abstract)
      result = domain.Command(branch).solve(domain, branch, @delimit(continuation, @DESCEND), scope)
      engine.console.groupEnd(continuation)

  unbranch: (engine, operation, continuation, scope) ->
    console.log('unbranch', old = engine.updating.collections?[continuation])
    if old = engine.updating.collections?[continuation]
      increment = if old < 0 || 1 / old == -Infinity then 1 else -1
      if (engine.queries[continuation] += increment) == 0
        @clean(engine, continuation, continuation, operation, scope)
        return true

  # Capture commands generated by evaluation of arguments
  yield: (result, engine, operation, continuation, scope) ->
    # Condition result bubbled up, pick a branch
    if operation.parent.indexOf(operation) == -1
      if operation[0].key?
        continuation = operation[0].key
        if scoped = operation[0].scope
          scope = engine.identity[scoped]

      if (index = continuation.lastIndexOf(@DESCEND)) > -1
        continuation = @getScopePath(engine, continuation, index == continuation.length - 1, true)

      path = @delimit(continuation, @DESCEND) + @key

      if !(value = engine.queries[path]) && result
        value = -0
      (engine.updating.collections ||= {})[path] = value
      @notify(engine, path, scope, result)


      return true

# Detect condition that only observes variables outside of current scope
Condition.Global = Condition.extend

  condition: (engine, operation, command) ->
    if command
      operation = operation[1]
    if operation[0] == 'get' || operation[1] == 'virtual'
      if operation.length == 2
        return false
    else if operation[0] == '&'
      return false
    for argument in operation
      if argument && argument.push && @condition(engine, argument) == false
        return false
    return true



  global: true

Condition::advices = [Condition.Global]

Condition.define 'if', {}
Condition.define 'unless', {
  inverted: true
}
Condition.define 'else', {
  signature: [
    then: ['Any']
  ]

  linked: true

  conditional: null
  domains: null
}
Condition.define 'elseif', {
  linked: true
}
Condition.define 'elsif', {
}
 
module.exports = Condition