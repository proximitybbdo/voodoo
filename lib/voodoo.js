(function() {
  var Voodoo, async, fs, grunt, l, p, path, root, util;

  util = require('util');

  fs = require('fs');

  path = require('path');

  async = require('async');

  l = require('logme');

  p = require('commander');

  grunt = require('grunt');

  process.title = "voodoo";

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Voodoo = Voodoo = (function() {

    Voodoo.REGEX_EXTS = /\.(js|coffee)$/;

    function Voodoo(cwd) {
      var tasks,
        _this = this;
      this.path_cwd = cwd;
      this.needle_dir = __dirname + '/' + 'needles';
      tasks = fs.readdirSync(this.needle_dir).filter(function(task) {
        path = __dirname + "/needles/" + task;
        return fs.statSync(_this.needle_dir + '/' + task).isDirectory();
      }).map(function(task) {
        return _this.needle_dir + '/' + task;
      }).concat(this.needle_dir);
      grunt.cli({
        base: this.path_cwd,
        config: __dirname + "/../config.js",
        tasks: tasks
      });
      this.log("still working");
    }

    Voodoo.prototype.log = function(log, state) {
      var msg;
      if (state == null) state = 'debug';
      msg = "[Voodoo] " + log;
      return l.log("info", msg);
    };

    return Voodoo;

  })();

  root.getVersion = function() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version;
  };

  root.run = function() {
    p.version(root.getVersion()).parse(process.argv);
    console.log("Voodoo CLI (" + p._version + ")");
    return this.voodoo = new Voodoo(process.cwd());
  };

}).call(this);
