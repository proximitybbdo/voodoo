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

  root.Voodoo = Voodoo = (function() {

    function Voodoo(cwd, opts) {
      var tasks,
        _this = this;
      this.version = opts._version;
      if (opts.base != null) {
        this.path_cwd = opts.base.substring(0, 1) === "/" ? opts.base : cwd + '/' + opts.base;
      } else {
        this.path_cwd = cwd;
      }
      this.needle_dir = __dirname + '/' + 'needles';
      tasks = fs.readdirSync(this.needle_dir).filter(function(task) {
        path = __dirname + "/needles/" + task;
        return fs.statSync(_this.needle_dir + '/' + task).isDirectory();
      }).map(function(task) {
        return _this.needle_dir + '/' + task;
      }).concat(this.needle_dir);
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
    p.version(root.getVersion()).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').parse(process.argv);
    return _this.voodoo = new Voodoo(process.cwd(), p);
  };

}).call(this);
