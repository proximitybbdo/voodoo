(function() {
  var needle, should, voodoo;

  should = require('should');

  voodoo = require(__dirname + '/../lib/voodoo.js').run();

  needle = require(__dirname + '/../lib/needle.js');

  describe('The voodoo', function() {
    return it('should have a local variable test with value `ok`', function() {
      return voodoo.test.should.equal("ok");
    });
  });

  describe('A needle', function() {
    it('should have `version` parameter', function() {
      return needle.should.have.property('version');
    });
    return it('should have `onEnd` callback function', function() {
      return needle.should.have.property('onEnd');
    });
  });

}).call(this);
