(function() {
  var should, voodoo;

  should = require('should');

  voodoo = require(__dirname + '/../lib/voodoo.js').run();

  describe('The voodoo', function() {
    return it('should have a version', function() {
      return voodoo.version.should.exists;
    });
  });

}).call(this);
