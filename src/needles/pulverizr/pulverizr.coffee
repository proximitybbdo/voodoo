###
Grunt Task File
---------------

Task: Pulverize
Description:
  Optimizes images in the passed folder (recursive!) using pulverizr
  Expects an object as a param, containing all possible options:

    options: {
      directory: 'assets/img',  // relative from voodoo base path, required
      dry: false,               // dryrun test  
      quiet: false,             // force quiet run
      recursive: false,         // Run recursively
      verbose: false            // Run verbosely
    }

Dependencies: pulverizr
###

pulverizr = require 'pulverizr'

done = ->

task.registerBasicTask "pulverize", "Squeeze bits from images", (data, name) ->
  # pulverization is async
  done = this.async()

  # check if the directory was passed, it is mandatory
  if not data.directory?
    log.error().error('No directory passed in the options')
    return false

  # squeeze !
  task.helper 'pulverizr', data

  # Fail task if errors were logged.
  return false if task.hadErrors() is on

task.registerHelper "pulverizr", (options) =>
  log.writeln options
  pulverizr.compress options.directory, options

  setTimeout ->
    done()

    # Otherwise, print a success message.
    log.writeln 'Files in "' + options.directory + '" pulverized.'
  , 1000
