# should lib for readable assertions
should = require 'should'

# voodoo for, erm, the testing :P
Voodoo = require(__dirname + '/../lib/voodoo').Voodoo

@fixtures = __dirname + '/fixtures/'

describe 'Custom config.js', =>
  it 'should contain only one task, `concat`', =>
    voodoo = new Voodoo process.cwd(), { "config": "--" }
    voodoo.config.exists
