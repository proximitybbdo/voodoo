# should lib for readable assertions
should = require 'should'

# voodoo for, erm, the testing :P
Voodoo = require(__dirname + '/../lib/voodoo').Voodoo
@voodoo = new Voodoo process.cwd()

describe 'Voodoo', =>
  it 'should have a version', =>
    @voodoo.version.should.exists

  it 'should have a list of tasks', =>
    @voodoo.tasks.should.exists
