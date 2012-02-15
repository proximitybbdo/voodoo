###
Grunt Task File
---------------

Task: <Name>
Description: <Description>
Dependencies: <Dependencies> or <None>
###

# task.registerBasicTask "clean", "Remove files if they exist", (data, name) =>
# 
#   # Do something potentially calling out to the registeredHelper below
#   # Run the helper with task.helper("name", files);
# 
#   # Fail task if errors were logged.
#   return false if task.hadErrors() is on
# 
#   # Otherwise, print a success message.
#   log.writeln "File \\"" + name + "\\" created."
# 
# task.registerHelper "remove", (param) =>
# #   # Do something in here and return a usable value in the task
# #   # Files will be an array of all the files defined in the configuration file.
