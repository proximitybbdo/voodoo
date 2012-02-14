# Module dependencies.
util = require 'util'
fs = require 'fs'
l = require 'logme'
p = require 'commander'
path = require 'path'

grunt = require 'grunt'

# set the process title to `voodoo` for `ps`, `top` and stuff
process.title = "voodoo"

# protect from prying eyes
root = exports ? this

# the version
root.version = '0.0.51'

# The Voodoo class
root.Voodoo = class Voodoo

  constructor: (cwd, opts) ->

    # the version, from the opts and thus, from the package.json
    if opts? and opts._version? then @version = opts._version else @version = root.version

    # local path from which the binairy is started
    # if opts.base is passed, we need to check if it's relative or absolute
    # absolute paths always start with `/` right?
    if opts? and opts.base?
      @cwd = if opts.base.substring(0, 1) is "/"  then opts.base else cwd + '/' + opts.base
    else
      @cwd = cwd

    console.log(cwd)

    # path for the needles
    @needle_dir = __dirname + '/' + 'needles'

    # force pass errors
    if opts? and opts.force? then @force = opts.force else @force = false

    # config file
    if opts? and opts.config? then @config = opts.config else @config = __dirname + '/../config.js'

    # auto-load tasks
    tasks = fs.readdirSync(@needle_dir)
      .filter (task) =>
        path =  __dirname + "/needles/" + task
        return fs.statSync(@needle_dir + '/' + task).isDirectory()
      .map (task) =>
        return @needle_dir + '/' + task
      .concat @needle_dir

    # start grunt
    grunt.cli {
      base: @cwd,
      config: @config
      tasks: tasks,
      force: @force
    }

  # logger util func
  log: (log, state = 'debug') ->
    msg = "[Voodoo] #{log}"

    l.log("info", msg)

# cli only
root.cli = =>
  p
    .version(root.version)
    .option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code')
    .option('-c, --config', 'an optional config.js file, replacing the build in config.js')
    .parse(process.argv)

  new Voodoo process.cwd(), p
