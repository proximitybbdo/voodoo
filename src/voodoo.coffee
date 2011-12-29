# Module dependencies.
util = require 'util'
fs = require 'fs'
path = require 'path'
async = require 'async'
l = require 'logme'
p = require 'commander'

# set the process title to `voodoo` for `ps`, `top` and stuff
process.title = "voodoo"

# protect from prying eyes
root = exports ? this

# The Voodoo class
root.Voodoo = class Voodoo
  @REGEX_EXTS = /\.(js|coffee)$/

  constructor: (cwd) ->

    # local path from which the binairy is started
    @path_cwd = cwd
    
    @needles_cwd = cwd + '/needles'

    @needles_lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib') + '/needles'

    @log @needles_cwd
    @log @needles_lib

    @needles = []

    @stickNeedles()

  stickNeedles: ->
    @log "Collect the needles"

    @needles = @needles.concat @paths @needles_cwd, Voodoo.REGEX_EXTS

    @log @needles

    @needles = @needles.concat @paths @needles_lib, Voodoo.REGEX_EXTS

    @log @needles


  # logger util func
  log: (log, state = 'debug') ->
    msg = "[Voodoo] #{log}"

    l.log("info", msg)

  # read files in folder
  paths: (dir, ext) ->
    paths = []

    try
      fs.statSync dir
    catch error
      @log error
      return []

    fs.readdir dir, (err, files) =>
      return err if err

      # read all the files, keep only js/coffee
      async.forEach files , (file, next) =>
        filepath = path.join dir, file
        filepath = fs.realpathSync filepath

        fs.stat filepath, (err, stats) =>
          if stats?.isFile and ext?.test file
            require filepath


# read the version from the package.json file
root.getVersion = ->
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version

root.run = ->
  p
    .version(root.getVersion())
    .parse(process.argv)

  console.log "Voodoo CLI (#{p._version})"

  vo = new Voodoo process.cwd()