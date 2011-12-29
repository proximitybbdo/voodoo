var util = require('util');
var l = require('logme');

module.exports = Needle = function() {
  this.version = "0.0.1";
  this.init = function() {
    l.log("info", "[needle] - jslint - " + this.version);
  }
}

new Needle().init();
