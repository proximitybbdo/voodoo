# should lib for readable assertions
should = require 'should'

# voodoo for, erm, the testing :P
Voodoo = require(__dirname + '/../lib/voodoo').Voodoo

@fixtures = __dirname + '/fixtures/'
@config = @fixtures + 'config.js'

describe 'Voodoo CLI options', =>
  describe '-c', =>
    it 'should set the custom config file to `' + @config + '`', =>
      voodoo = new Voodoo @fixtures, { "config": @config }
      voodoo.config.should.equal(@config)

  describe '-b', =>
    it '-b should set the base path to `' + @fixtures + '`', =>
      voodoo = new Voodoo process.cwd(), { "base" : @fixtures, "config": "./config.js" }
      voodoo.cwd.should.equal(__dirname + "/fixtures/")
