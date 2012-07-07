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
      var needles,
        _this = this;
      if ((opts != null) && (opts.base != null)) {
        this.cwd = opts.base.substring(0, 1) === "/" ? opts.base : cwd + '/' + opts.base;
      } else {
        this.cwd = cwd;
      }
      this.needle_dir = __dirname + '/' + 'needles';
      if ((opts != null) && (opts.force != null)) {
        this.force = opts.force;
      } else {
        this.force = false;
      }
      if (this.cwd.substring(this.cwd.length - 1) !== '/') this.cwd += '/';
      this.config = this.cwd + 'voodoo.js';
      if ((opts != null) && (opts.generate != null)) {
        if (fs.existsSync(this.config)) {
          console.log('voodoo.js exists, nothing generated');
        } else {
          this.generateConfig(this.config);
        }
        return;
      } else {
        this.generateConfig(this.config);
      }
      needles = fs.readdirSync(this.needle_dir).filter(function(needle) {
        path = __dirname + "/needles/" + needle;
        return fs.statSync(_this.needle_dir + '/' + needle).isDirectory();
      }).map(function(needle) {
        return _this.needle_dir + '/' + needle;
      }).concat(this.needle_dir);
      grunt.tasks({}, {
        config: this.config,
        base: this.cwd,
        tasks: needles,
        force: this.force
      });
    }

    Voodoo.prototype.generateConfig = function(filepath) {
      var buff;
      if (!fs.existsSync(filepath)) {
        buff = fs.readFileSync(__dirname + '/../voodoo.js');
        fs.writeFileSync(filepath, buff);
        return console.log('generated default voodoo.js');
      }
    };

    return Voodoo;

  })();

  root.cli = function() {
    p.version(root.version).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').option('-g, --generate', 'generate a default voodoo.js file').parse(process.argv);
    return new Voodoo(process.cwd(), p);
  };

}).call(this);
