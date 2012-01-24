# Module dependencies.
util = require 'util'
fs = require 'fs'
path = require 'path'
async = require 'async'
l = require 'logme'
p = require 'commander'


grunt = require 'grunt'


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

    @needle_dir = __dirname + '/' + 'needles'

    # Auto-load tasks
    tasks = fs.readdirSync(@needle_dir)
      .filter (task) =>
        path =  __dirname + "/needles/" + task
        return fs.statSync(@needle_dir + '/' + task).isDirectory()
      .map (task) =>
        return @needle_dir + '/' + task
      .concat @needle_dir

    # TODO: make verbose a CLI param for voodoo
    grunt.cli {
      base: @path_cwd,
      config: __dirname + "/../config.js",
      tasks: tasks
      # verbose: true
    }

    @log "still working"

  # logger util func
  log: (log, state = 'debug') ->
    msg = "[Voodoo] #{log}"

    l.log("info", msg)

# read the version from the package.json file
root.getVersion = ->
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version

root.run = ->
  p
    .version(root.getVersion())
    .parse(process.argv)

  console.log "Voodoo CLI (#{p._version})"

  @voodoo = new Voodoo process.cwd()
