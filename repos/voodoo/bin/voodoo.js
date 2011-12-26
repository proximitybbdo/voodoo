var util = require('util');
var fs = require('fs');
var file = require('file');
var path = require('path');

// var jslint = require('jslint-strict')
// var options = { strict: true, es5: true, node: true };

var site = __dirname + '/../site';

/**
* Helper function to recursively travers dir for files
*/
var walk = function(dir, callback) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return callback(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file)
        return callback(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

var exclude_list = ["dd_belatedpng.js", "selectivizr.js", "less.js"];

walk(site, function(err, results){
  results.every(function(file) {

    var f = path.basename(file);

    if(!exclude_list.inArray(f)) {
      if(file.indexOf('.js') != -1 && file.indexOf('.min.js') == -1) {
        util.log("will validate: " + file);
        validate(file);
      }
    }
    
    return true;
  });
});


var exec = require('child_process').exec;

function puts(error, stdout, stderr) { 
  util.log(stdout);
}

// exec("find ./site -type f -regex '.*[^min].js' | xargs -n1 echo $1", puts);

function validate(filename) {
  // util.print('Checking ' + filename.replace(__dirname + '/', '') + '... ');
  fs.readFile(filename, 'utf8', function(err, file) {
    exec('jslint --browser true --sloppy true -gp ' + filename, puts);
  });
}



// ---------------------------------------------------------------------------
// H E L P E R S
// ---------------------------------------------------------------------------

// Returns true if the passed value is found in the
// array. Returns false if it is not.
Array.prototype.inArray = function (value,caseSensitive) {
  var i;
  for (i=0; i < this.length; i++) {
    // use === to check for Matches. ie., identical (===),
    if(caseSensitive){  //performs match even the string is case sensitive
      if (this[i].toLowerCase() == value.toLowerCase()) {
        return true;
      }
    }else{
      if (this[i] == value) {
        return true;
      }
    }
  }
  return false;
};
