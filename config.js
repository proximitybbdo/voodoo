config.init({

  lint: {
    files: ["assets/js/*.js"]
  },

  concat: {
    // Application files
    "assets/js/app.js": ["assets/js/*.js"],

    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/*.js"
    ],
  },

  min: {
    "assets/js/libs.js": ["assets/js/libs.js"],
    "assets/js/app.js": ["assets/js/app.js"]
  },

});

// Run the following tasks...
task.registerTask("default", "lint:files concat min");
