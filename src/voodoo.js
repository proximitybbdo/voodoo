(function() {
  var Voodoo, fs, path, util, vo;

  util = require('util');

  fs = require('fs');

  path = require('path');

  process.title = "voodoo";

  Voodoo = (function() {

    function Voodoo() {
      this.initialize();
      this.pinchNeedles();
    }

    Voodoo.prototype.initialize = function() {
      this.path = ".";
      this.version = this.getVersion();
      this.needles = [];
      this.needle_dir = this.path + '/needles';
      this.needle_exts = /\.(js|coffee)$/;
      return util.log(this.version);
    };

    Voodoo.prototype.pinchNeedles = function() {
      util.log("[voodoo] Collect the needles");
      return this.needles = this.paths(this.needle_dir, this.needle_exts);
    };

    Voodoo.prototype.getVersion = function() {
      return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version;
    };

    Voodoo.prototype.paths = function(dir, ext) {
      return fs.readdir(dir, function(err, files) {
        var file, filepath, _i, _len, _results;
        if (err) return err;
        _results = [];
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          filepath = path.join(dir, file);
          util.log(file);
          _results.push(fs.stat(filepath, function(err, stats) {
            if (stats != null ? stats.isFile() : void 0) return util.log(file);
          }));
        }
        return _results;
      });
    };

    return Voodoo;

  })();

  vo = new Voodoo;

}).call(this);
