var should = require('should');
// var voodoo = require(__dirname + '/../bin/voodoo');
// var voodoo = require('../');
// voodoo.run();
var voodoo = require(__dirname + '/../lib/voodoo.js').run();

describe('voodoo', function() {
 it('should have a local variable test with value `ok`', function() {
   voodoo.test.should.equal("ok");
 });

 it('should have a and more', function() {
   voodoo.test.should.equal("ok");
 });

});
