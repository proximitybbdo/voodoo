
/*
Grunt Task File
---------------

Task: Clean
Description:
  Remove files (if they exist), could be used when using other tasks like
  concat which outputs files in the same dir. Prior to the whole task chain,
  you could put a clean task, to remove residues from the previous Voodoo.

  E.g.: 
    you concat every *.js file inside your /js folder, and that results in 
    a.js and b.js being combined into total.js. 
    Next time you Voodoo, the process will be a.js + b.js + total.js = total.js
    Obviously, your total.js will increase incrementally

Dependencies: fs
*/

(function() {
  var fs,
    _this = this;

  fs = require('fs');

  task.registerBasicTask("clean", "Remove files if they exist", function(data, name) {
    var f, files, _i, _len;
    files = file.expand(data);
    if (files.length === 0) {
      log.writeln('No files to remove');
      return true;
    }
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      f = files[_i];
      task.helper('remove', f);
    }
    if (task.hadErrors() === true) return false;
    return log.writeln('Files "' + files + '" deleted.');
  });

  task.registerHelper("remove", function(f) {
    try {
      fs.unlink(f);
      return verbose.writeln('File "' + f + '" deleted.');
    } catch (e) {
      return log.writeln('File "' + f + '" could not be deleted.');
    }
  });

}).call(this);
