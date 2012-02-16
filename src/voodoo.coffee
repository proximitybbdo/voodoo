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
    # if opts? and opts.force? then @force = opts.force else @force = false

    # cwd is a path, a path ends with a trailing slash, period!
    # (@cwd += '/') if @cwd.substring(@cwd.length - 1) != '/'

    # where our gruntfile will be
    @config = @cwd + 'voodoo.js'

    # here we generate a default voodoo.js in the active dir
    # TODO: check if there already is a file!
    # for now there seems to be a bug in fs.statSync
    # when the target file is not present, it returns Nan Nan
    #
    # the original file
    buff = fs.readFileSync(__dirname + '/../voodoo.js')
    fs.writeFileSync(@config, buff)

    # auto-load default tasks
    needles = fs.readdirSync(@needle_dir)
      .filter (needle) =>
        path =  __dirname + "/needles/" + needle
        return fs.statSync(@needle_dir + '/' + needle).isDirectory()
      .map (needle) =>
          return @needle_dir + '/' + needle
      .concat @needle_dir

    # start grunt
    grunt.tasks({}, { config: @config, base: @cwd, tasks: needles })

# cli only
root.cli = =>
  p
    .version(root.version)
    .option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code')
    .parse(process.argv)

  new Voodoo process.cwd(), p
