config.init({

  lint: {
    files: ["assets/js/*.js"]
  },

  concat: {
    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/*.js"
    ],

    // Application files
    "assets/js/app.js": ["assets/js/*.js"],
  },

  min: {
    "assets/js/libs.js": ["assets/js/libs.js"],
    "assets/js/app.js": ["assets/js/app.js"]
  },

});

// Run the following tasks...
task.registerTask("default", "lint:files concat min");
