config.init({
  clean: {
    files: ['assets/js/libs.js', 'assets/js/app.js']  
  },

  concat: {
    // Application files
    "assets/js/app.js": ["assets/js/*.js"],

    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/*.js"
    ]
  },

});

// Run the following tasks...
task.registerTask("default", "concat");
