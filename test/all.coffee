# should lib for readable assertions
should = require 'should'

# voodoo for, erm, the testing :P
voodoo = require(__dirname + '/../lib/voodoo.js').run()

describe 'The voodoo', ->
 it 'should have a version', ->
   voodoo.version.should.exists
