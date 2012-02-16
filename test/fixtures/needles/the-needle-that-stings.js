var util = require('util');

Needle = function() {
  this.version = "0.0.1";
  this.init = function() {
    util.log("\x1B[32m[needle - ouch! - " + this.version + "]\x1B[0m");
  }
}

new Needle().init();
