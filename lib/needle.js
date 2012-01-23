(function() {
  var Needle, exports, l, util;

  util = require('util');

  l = require('logme');

  Needle = (function() {

    function Needle() {
      this.version = "0.0.1";
      l.log("info", "[needle] " + this.version);
    }

    Needle.prototype.onEnd = function(callback) {
      l.log("info", "[needle] onEnd callback");
      return callback();
    };

    return Needle;

  })();

  exports = module.exports = new Needle();

}).call(this);
