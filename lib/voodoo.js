(function() {
  var Voodoo, fs, grunt, l, p, path, root, util,
    _this = this;

  util = require('util');

  fs = require('fs');

  l = require('logme');

  p = require('commander');

  path = require('path');

  grunt = require('grunt');

  process.title = "voodoo";

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.version = '0.0.6';

  root.Voodoo = Voodoo = (function() {

    function Voodoo(cwd, opts) {
      var tasks,
        _this = this;
      if ((opts != null) && (opts._version != null)) {
        this.version = opts._version;
      } else {
        this.version = root.version;
      }
      if ((opts != null) && (opts.base != null)) {
        this.cwd = opts.base.substring(0, 1) === "/" ? opts.base : cwd + '/' + opts.base;
      } else {
        this.cwd = cwd;
      }
      console.log(cwd);
      this.needle_dir = __dirname + '/' + 'needles';
      if ((opts != null) && (opts.force != null)) {
        this.force = opts.force;
      } else {
        this.force = false;
      }
      if ((opts != null) && (opts.config != null)) {
        this.config = opts.config;
      } else {
        this.config = __dirname + '/../config.js';
      }
      tasks = fs.readdirSync(this.needle_dir).filter(function(task) {
        path = __dirname + "/needles/" + task;
        return fs.statSync(_this.needle_dir + '/' + task).isDirectory();
      }).map(function(task) {
        return _this.needle_dir + '/' + task;
      }).concat(this.needle_dir);
      grunt.cli({
        base: this.cwd,
        config: this.config,
        tasks: tasks,
        force: this.force
      });
    }

    Voodoo.prototype.log = function(log, state) {
      var msg;
      if (state == null) state = 'debug';
      msg = "[Voodoo] " + log;
      return l.log("info", msg);
    };

    return Voodoo;

  })();

  root.cli = function() {
    p.version(root.version).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').option('-c, --config', 'an optional config.js file, replacing the build in config.js').parse(process.argv);
    return new Voodoo(process.cwd(), p);
  };

}).call(this);
