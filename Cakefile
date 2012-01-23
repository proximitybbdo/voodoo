fs = require 'fs'
{exec} = require 'child_process'

task 'build', 'build', (options) ->
  console.log '$ Task Build'

  exec 'coffee -c -o lib src', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

  exec 'coffee -c -o lib src/needles/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'test', 'test', (options) ->
  console.log '$ Task Test'

  invoke 'build'

  exec 'coffee -c -o test test', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  
  exec 'make test', (err) ->
    throw err if err
