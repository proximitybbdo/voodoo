/**
 * Module dependencies.
 */
var util = require('util'),
    fs = require('fs'),
    path = require('path');

Voodoo = function(args) {
  this.path = args;
  this.version = getVersion();

  this.needle_exts = /\.(js|coffee)$/;
  this.needle_dir = '/needles';
  this.needles = [];

  this.init = function() {
    util.log("[voodoo " + this.version + "]");
    util.log("[voodoo] init: " + this.path);
    
    this.needle_dir = this.path + '/needles';

    this.pinchNeedles();
  }
}


/**
 * Read the needles - our small recipes
 */
Voodoo.prototype.pinchNeedles = function() {
  util.log("[voodoo] Collect the needles"); 

  this.needles = paths(this.needle_dir, this.needle_exts);

  this.needles.every(function(elem) {
    util.log("[voodoo] " + elem);
    // fs.readFile(elem);
    require(elem);
  });

}

/**
 * Read the version from the package.json file
 */
function getVersion() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'))).version;
}


// ---------------------------------------------------------------------------
// U T I L I T I E S
// ---------------------------------------------------------------------------

function paths(dir, ext) {
    var paths = [];

    try { fs.statSync(dir) }
    catch (e) { return [] }

    (function traverse(dir, stack) {
        stack.push(dir);
        fs.readdirSync(stack.join('/')).forEach(function (file) {
            var path = stack.concat([file]).join('/'),
                stat = fs.statSync(path);

            if (file[0] == '.' || file === 'vendor') {
                return;
            } else if (stat.isFile() && ext.test(file)) {
                paths.push(path);
            } else if (stat.isDirectory()) {
                traverse(file, stack);
            }
        });
        stack.pop();
    })(dir || '.', []);

    return paths;
}
