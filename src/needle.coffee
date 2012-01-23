util = require 'util'
l = require 'logme'

class Needle
  
  constructor: ->
    @version = "0.0.1"

    l.log "info", "[needle] " + this.version

  onEnd: (callback)->
    l.log "info", "[needle] onEnd callback"
    callback()

exports = module.exports = new Needle()
