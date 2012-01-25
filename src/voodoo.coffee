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

# The Voodoo class
root.Voodoo = class Voodoo

  constructor: (cwd, opts) ->

    # the version, from the opts and thus, from the package.json
    @version = opts._version

    # local path from which the binairy is started
    # if opts.base is passed, we need to check if 
    # it's relative or absolute
    # absolute paths always start with `/` right?
    if opts.base?
      @path_cwd = if opts.base.substring(0, 1) is "/"  then opts.base else cwd + '/' + opts.base
    else
      @path_cwd = cwd

    # path for the needles
    @needle_dir = __dirname + '/' + 'needles'

    # Auto-load tasks
    tasks = fs.readdirSync(@needle_dir)
      .filter (task) =>
        path =  __dirname + "/needles/" + task
        return fs.statSync(@needle_dir + '/' + task).isDirectory()
      .map (task) =>
        return @needle_dir + '/' + task
      .concat @needle_dir

    # start grunt
    # grunt.cli {
    #   base: @path_cwd,
    #   config: __dirname + "/../config.js",
    #   tasks: tasks,
    #   force: opts.force
    # }

  # logger util func
  log: (log, state = 'debug') ->
    msg = "[Voodoo] #{log}"

    l.log("info", msg)

# read the version from the package.json file
root.getVersion = ->
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version

root.run = =>
  p
    .version(root.getVersion())
    .option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code')
    .parse(process.argv)

  @voodoo = new Voodoo process.cwd(), p
