# Module dependencies.
util = require 'util'
fs = require 'fs'
path = require 'path'
async = require 'async'

# set the process title to `voodoo` for `ps`, `top` and stuff
process.title = "voodoo"

# The Voodoo class
class Voodoo
  constructor: () ->
    @initialize()
    @pinchNeedles()

  initialize: ->
    # local path from which the binairy is started
    @path = "."

    @version = @getVersion()

    @needles = []

    @needle_dir = @path + '/needles'
    @needle_exts = /\.(js|coffee)$/
    util.log @version

  pinchNeedles: ->
    util.log "[voodoo] Collect the needles"
    @needles = @paths @needle_dir, @needle_exts

  # Read the version from the package.json file
  getVersion: ->
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version

  # -----------------------------------------
  # U T I L I T I E S
  # -----------------------------------------

  paths: (dir, ext) ->
    paths = []

    try
      fs.statSync dir
    catch error
      util.log error
      return []

    fs.readdir dir, (err, files) ->
      return err if err

      # read all the files, keep only js/coffee
      async.forEach files , (file, next) =>
        filepath = path.join dir, file
        filepath = fs.realpathSync filepath
        fs.stat filepath, (err, stats) ->
          if stats?.isFile()
            require filepath

vo = new Voodoo
