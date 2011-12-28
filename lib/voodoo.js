(function() {
  var Voodoo, async, fs, l, p, path, root, util;

  util = require('util');

  fs = require('fs');

  path = require('path');

  async = require('async');

  l = require('logme');

  p = require('commander');

  process.title = "voodoo";

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Voodoo = Voodoo = (function() {

    Voodoo.REGEX_EXTS = /\.(js|coffee)$/;

    function Voodoo(cwd) {
      this.path = cwd;
      this.log(this.path);
      this.needles = [];
      this.needle_dir = this.path + '/needles';
      this.stickNeedles();
    }

    Voodoo.prototype.stickNeedles = function() {
      this.log("Collect the needles");
      return this.needles = this.paths(this.needle_dir, Voodoo.REGEX_EXTS);
    };

    Voodoo.prototype.log = function(log, state) {
      var msg;
      if (state == null) state = 'debug';
      msg = "[Voodoo] " + log;
      return l.log("info", msg);
    };

    Voodoo.prototype.paths = function(dir, ext) {
      var paths,
        _this = this;
      paths = [];
      try {
        fs.statSync(dir);
      } catch (error) {
        this.log(error);
        return [];
      }
      return fs.readdir(dir, function(err, files) {
        if (err) return err;
        return async.forEach(files, function(file, next) {
          var filepath;
          filepath = path.join(dir, file);
          filepath = fs.realpathSync(filepath);
          return fs.stat(filepath, function(err, stats) {
            if ((stats != null ? stats.isFile : void 0) && (ext != null ? ext.test(file) : void 0)) {
              return require(filepath);
            }
          });
        });
      });
    };

    return Voodoo;

  })();

  root.getVersion = function() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version;
  };

  root.run = function() {
    var vo;
    p.version(root.getVersion()).parse(process.argv);
    console.log("Voodoo CLI (" + p._version + ")");
    return vo = new Voodoo(process.cwd());
  };

  root.run();

}).call(this);
