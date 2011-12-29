fs = require 'fs'
{exec} = require 'child_process'

task 'build', 'build', (options) ->
  console.log '$ Task Build'

  exec 'coffee -c -o lib src', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

  exec 'cp src/needles/*.js lib/needles/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'test', 'test', (options) ->
  console.log '$ Tast Test'

  invoke 'build'

  voodoo = exec "./bin/voodoo"
  voodoo.stdout.pipe process.stdout
  voodoo.stderr.pipe process.stderr
