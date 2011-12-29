util = require 'util'
l = require 'logme'

module.exports = Needle = class Needle
  
  constructor: ->
    @version = "0.0.1"

    l.log "info", "[needle] - jslint - " + this.version

new Needle
