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

    @test = "ok"

    # paths to the needles folders, the default one
    # located in the lib folder, the other one
    # is search in the directory where the util is called
    @needles_cwd = cwd + '/needles'

    @needles_lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib') + '/needles'

    @needles = []

    @stickNeedles()

  # collect needles
  stickNeedles: ->
    @log "Collect the needles"

    # local lib needle dir
    @needles = @needles.concat @paths @needles_lib, Voodoo.REGEX_EXTS

    # remote needle dir
    @needles = @needles.concat @paths @needles_cwd, Voodoo.REGEX_EXTS

  # logger util func
  log: (log, state = 'debug') ->
    msg = "[Voodoo] #{log}"

    l.log("info", msg)

  # read files in folder
  paths: (dir, ext, verbose = false) ->
    paths = []

    try
      fs.statSync dir
    catch error
      @log error if verbose
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

  @voodoo = new Voodoo process.cwd()
