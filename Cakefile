fs = require 'fs'
{exec} = require 'child_process'

task 'clean', 'clean', (options) ->
  console.log '$ Task Clean'

  exec 'rm -r lib/*', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'build', 'build', (options) ->
  console.log '$ Task Build'

  invoke 'clean'
    
  exec 'coffee -c -o lib src', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'viewjs', 'view compiled js file', (options) ->
  console.log '$ Task View'

  invoke 'build'

  cat = exec 'cat lib/voodoo.js'
  cat.stdout.pipe process.stdout
  cat.stderr.pipe process.stderr

task 'test', 'test', (options) ->
  console.log '$ Task Test'

  invoke 'build'

  exec 'coffee -c -o test test', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  
  exec 'make test', (err) ->
    throw err if err
