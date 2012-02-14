config.init({

  concat: {
    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/*.js"
    ],

    // Application files
    "assets/js/app.js": ["assets/js/*.js"],
  },

});

// Run the following tasks...
task.registerTask("default", "concat");
