# Module dependencies.
util = require 'util'
fs = require 'fs'
p = require 'commander'
path = require 'path'

# the hard worker
grunt = require 'grunt'

# set the process title to `voodoo` for `ps`, `top` and stuff
process.title = "voodoo"

# protect from prying eyes
root = exports ? this

# the version
root.version = file.readJson(path.join(__dirname, '../package.json')).version

# The Voodoo class
root.Voodoo = class Voodoo

  constructor: (cwd, opts) ->
    # local path from which the binairy is started
    # if opts.base is passed, we need to check if it's relative or absolute
    # absolute paths always start with `/` right?
    if opts? and opts.base?
      @cwd = if opts.base.substring(0, 1) is "/"  then opts.base else cwd + '/' + opts.base
    else
      @cwd = cwd

    # path for the needles
    @needle_dir = __dirname + '/' + 'needles'

    # force pass errors
    if opts? and opts.force? then @force = opts.force else @force = false

    # cwd is a path, a path ends with a trailing slash, period!
    (@cwd += '/') if @cwd.substring(@cwd.length - 1) != '/'

    # here we generate a default voodoo.js in the active dir
    # TODO: check if there already is a file!
    # for now there seems to be a bug in fs.statSync
    # when the target file is not present, it returns Nan Nan
    configOriginal = fs.readFileSync(__dirname + '/../voodoo.js')
    configCustom = fs.writeFileSync(@cwd + 'voodoo.js', configOriginal)

    # auto-load tasks
    tasks = fs.readdirSync(@needle_dir)
      .filter (task) =>
        path =  __dirname + "/needles/" + task
        return fs.statSync(@needle_dir + '/' + task).isDirectory()
      .map (task) =>
        return @needle_dir + '/' + task
      .concat @needle_dir

    # start grunt
    # grunt.cli {
    #   base: @cwd,
    #   config: @config,
    #   tasks: tasks,
    #   force: @force
    # }
    grunt.tasks(tasks, { config: @config, base: @cwd })

# cli only
root.cli = =>
  p
    .version(root.version)
    .option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code')
    .option('--custom', 'an custom voodoo.js file, replacing the build in voodoo.js, with your own settings')
    .parse(process.argv)

  new Voodoo process.cwd(), p
