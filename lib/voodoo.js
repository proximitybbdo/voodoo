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
      var configCustom, configOriginal, tasks,
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
      configOriginal = fs.readFileSync(__dirname + '/../voodoo.js');
      configCustom = fs.writeFileSync(this.cwd + 'voodoo.js', configOriginal);
      tasks = fs.readdirSync(this.needle_dir).filter(function(task) {
        path = __dirname + "/needles/" + task;
        return fs.statSync(_this.needle_dir + '/' + task).isDirectory();
      }).map(function(task) {
        return _this.needle_dir + '/' + task;
      }).concat(this.needle_dir);
      grunt.tasks(tasks, {
        config: this.config,
        base: this.cwd
      });
    }

    return Voodoo;

  })();

  root.cli = function() {
    p.version(root.version).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').option('--custom', 'an custom voodoo.js file, replacing the build in voodoo.js, with your own settings').parse(process.argv);
    return new Voodoo(process.cwd(), p);
  };

}).call(this);
