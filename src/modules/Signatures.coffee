### 

Generate lookup structures to match methods by name and argument type signature

Signature for `['==', ['get', 'a'], 10]` would be `engine.signatures['==']['Value']['Number']`

A matched signature returns customized class for an operation that can further 
pick a sub-class dynamically. Signatures allows special case optimizations and 
composition to be coded as a structural composition, instead of branching in runtime.

Signatures are shared between commands. Dispatcher support css-style 
typed optional argument groups, but has no support for keywords yet
###
Command = require('../concepts/Command')

class Signatures
  
  constructor: (@engine) ->
    
  # Register signatures defined in a given object
  sign: (command, storage, object, step) ->
    if signature = object.signature
      @set command, storage, signature, step
    else if signatures = object.signatures
      for signature in signatures
        @set command, storage, signature, step
        
  permute: (arg, permutation) ->
    keys = Object.keys(arg)
    return keys unless permutation
    values = Object.keys(arg)
    group = []
    
    # Put keys at their permuted places
    for position, index in permutation
      unless position == null
        group[position] = keys[index]
    
    # Fill blank spots with     
    for i in [permutation.length ... keys.length] by 1
      for j in [0 ... keys.length] by 1
        unless group[j]?
          group[j] = keys[i]
          break
          
    # Validate that there're no holes
    for arg in group
      if arg == undefined
        return
        
    return group

  # Return array of key names for current permutation
  getPermutation: (args, properties) ->
    result = []
    for arg, index in args
      unless arg == null
        result[arg] = properties[index]
    for arg, index in result by -1
      unless arg?
        result.splice(index, 1)
    return result

  # Return array with positions for given argument signature
  getPositions: (args) ->
    result = []
    for value, index in args
      if value?
        result[value] = index
    for arg, index in result by -1
      unless arg?
        result.splice(index, 1)
    return result

  # Return array of keys for a full list of arguments
  getProperties: (signature) ->
    if properties = signature.properties
      return properties
    signature.properties = properties = []
    for arg in signature
      if arg.push
        for a in arg
          for property, definition of a
            properties.push(definition)
      else
        for property, definition of arg
          properties.push(definition)
    return properties

  generate: (combinations, command, storage, positions, properties, i = 0) ->

    while (props = properties[i]) == undefined && i < properties.length
      i++

    if i == properties.length
      return if storage.resolved
      storage.resolved = Command.extend.call command,
        permutation: positions
    else
      for type in properties[i]
        @generate combinations, command, storage, positions, properties, i + 1
        
  # Create actual nested lookup tables for argument types
  write: (args, command, storage, positions, properties)->
    combinations = []
    @generate combinations, command, storage, positions, properties


    return

  # Write cached lookup tables into a given storage (register method by signature)
  apply: (storage, signature) ->
    for property, value of signature
      if typeof value == 'object'
        @apply storage[property] ||= {}, value
      else
        storage[property] = value
    return
    
  # Generate a lookup structure to find method definition by argument signature
  set: (command, storage, signature, args, permutation, types) ->
    # Lookup subtype and catch-all signatures
    unless signature.push
      for type of types
        if proto = command[type]?.prototype
          @sign command[type], storage, proto
      @sign command, storage, command.prototype
      return


    args ||= []
    i = args.length
    
    # Find argument by index in definition
    `seeker: {`
    for arg in signature
      if arg.push
        for obj, k in arg
          j = 0
          group = arg
          for property of obj
            unless i
              arg = obj
              unless keys = @permute(arg,  permutation)
                return
              argument = arg[property]
              `break seeker`
            i--
            j++
      else
        j = undefined
        for property of arg
          unless i
            argument = arg[property]
            `break seeker`
          i--
    `}`
    
    # End of signature
    unless argument
      @write args, command, storage, @getPositions(args), @getPermutation(args, @getProperties(signature))
      return
      
    # Permute optional argument within its group
    if keys && j?
      permutation ||= []
      
      for i in [0 ... keys.length] by 1
        if permutation.indexOf(i) == -1
          @set command, storage, signature, args.concat(args.length - j + i), permutation.concat(i)
  
      @set command, storage, signature, args.concat(null), permutation.concat(null)
      return
        
    # Register all input types for given arguments
    @set command, storage, signature, args.concat(args.length)

module.exports = Signatures