util = require 'util'

module.exports = Needle = class Needle
  
  constructor: ->
    @version = "0.0.1"

    util.log "\x1B[32m[needle - jslint - " + this.version + "]\x1B[0m"

new Needle
