###
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
###

fs = require 'fs'

task.registerBasicTask "clean", "Remove files if they exist", (data, name) =>
  # get all passed files
  files = file.expand data

  # if there are no files to remove, return true
  if files.length == 0
    log.writeln 'No files to remove'
    return true
    
  # remove all the passed files
  task.helper('remove', f) for f in files

  # Fail task if errors were logged.
  return false if task.hadErrors() is on

  # Otherwise, print a success message.
  log.writeln 'Files "' + files + '" deleted.'

task.registerHelper "remove", (f) =>
  try
    fs.unlink f
    verbose.writeln 'File "' + f + '" deleted.'
  catch e
    log.writeln 'File "' + f + '" could not be deleted.'


