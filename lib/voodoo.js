(function() {
  var Voodoo, fs, grunt, p, path, root, util, winston,
    _this = this;

  util = require('util');

  fs = require('fs');

  p = require('commander');

  path = require('path');

  winston = require('winston');

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
      winston.add(winston.transports.File, {
        filename: 'somefile.log'
      });
      console.log('a');
      console.log('b');
      this.unhook();
      console.log('c');
      console.log('d');
    }

    Voodoo.prototype.hook_stdout = function(callback) {
      var old_write,
        _this = this;
      old_write = process.stdout.write;
      process.stdout.write = (function(write) {
        return function(string, encoding, fd) {
          write.apply(process.stdout, arguments);
          winston.log('info', string);
          return callback(string, encoding, fd);
        };
      })(process.stdout.write);
      return function() {
        return process.stdout.write = old_write;
      };
    };

    Voodoo.prototype.unhook = function() {
      return this.hook_stdout(function(string, encoding, fd) {
        return util.debug('d');
      });
    };

    return Voodoo;

  })();

  root.cli = function() {
    p.version(root.version).option('-b, --base <path>', 'working directory for your site (where `assets` folder is in )').option('-v, --verbose', 'verbose output').option('-f, --force', 'a way to force your way past warnings. Want a suggestion? Don\'t use this option, fix your code').parse(process.argv);
    return new Voodoo(process.cwd(), p);
  };

}).call(this);
