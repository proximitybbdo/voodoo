(function() {
  var Voodoo, fs, grunt, p, path, root, util,
    _this = this;

  util = require('util');

  fs = require('fs');

  p = require('commander');

  path = require('path');

  grunt = require('grunt');

  process.title = "voodoo";

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.version = file.readJson(path.join(__dirname, '../package.json')).version;

  root.Voodoo = Voodoo = (function() {

    function Voodoo(cwd, opts) {
      var buff, needles,
        _this = this;
      if ((opts != null) && (opts.base != null)) {
        this.cwd = opts.base.substring(0, 1) === "/" ? opts.base : cwd + '/' + opts.base;
      } else {
        this.cwd = cwd;
      }
      this.needle_dir = __dirname + '/' + 'needles';
      this.config = this.cwd + 'voodoo.js';
      buff = fs.readFileSync(__dirname + '/../voodoo.js');
      fs.writeFileSync(this.config, buff);
      needles = fs.readdirSync(this.needle_dir).filter(function(needle) {
        path = __dirname + "/needles/" + needle;
        return fs.statSync(_this.needle_dir + '/' + needle).isDirectory();
      }).map(function(needle) {
        return _this.needle_dir + '/' + needle;
      }).concat(this.needle_dir);
      grunt.tasks({}, {
        config: this.config,
        base: this.cwd,
        tasks: needles
      });
    }

    return Voodoo;

  })();

  root.cli = function() {
    p.version(root.version).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').option('--custom', 'an custom voodoo.js file, replacing the build in voodoo.js, with your own settings').parse(process.argv);
    return new Voodoo(process.cwd(), p);
  };

}).call(this);
