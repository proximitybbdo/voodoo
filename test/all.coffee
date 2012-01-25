# should lib for readable assertions
should = require 'should'

# voodoo for, erm, the testing :P
voodoo = require(__dirname + '/../lib/voodoo').run()

# needle, obviously
needle = require(__dirname + '/../lib/needle.js')

describe 'The voodoo', ->
 it 'should have a local variable test with value `ok`', ->
   voodoo.test.should.equal("ok")

describe 'A needle', ->
  it 'should have `version` parameter', ->
    needle.should.have.property('version')

  it 'should have `onEnd` callback function', ->
    needle.should.have.property('onEnd')
