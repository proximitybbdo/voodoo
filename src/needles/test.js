var util = require('util');
var l = require('logme');

Needle = function() {
  this.version = "0.0.1";
  this.init = function() {
    l.log("info", "[needle] - test - oops! - " + this.version);
  }
}

new Needle().init();
