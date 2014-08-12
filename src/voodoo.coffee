# Module dependencies.
util = require 'util'
fs = require 'fs'
p = require 'commander'
path = require 'path'

# set the process title to `voodoo` for `ps`, `top` and stuff
process.title = "voodoo"

# protect from prying eyes
root = exports ? this

# the version
pjson = require '../package.json'
root.version = pjson.version

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

    # force pass errors
    if opts? and opts.force? then @force = opts.force else @force = false

    # cwd is a path, a path ends with a trailing slash, period!
    (@cwd += '/') if @cwd.substring(@cwd.length - 1) != '/'

    # where our gruntfile will be
    @gruntfile = @cwd + 'grunt.js'

    if path.existsSync(@gruntfile)
      console.log 'grunt.js exists, nothing generated'
    else
      @generateConfig(@gruntfile)
    return

  # here we generate a default voodoo.js in the active dir
  # if there is no voodoo.js present
  generateConfig: (filepath) ->
    if !path.existsSync(filepath)
      buff = fs.readFileSync(__dirname + '/../grunt.js')
      fs.writeFileSync(filepath, buff)
      console.log 'Generated default grunt.js'

# cli only
root.cli = =>
  p
    .version(root.version)
    .option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )')
    .option('-v, --verbose', 'verbose output')
    .option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code')
    .parse(process.argv)

  new Voodoo process.cwd(), p
