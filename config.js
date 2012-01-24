config.init({

  lint: {
    files: ["assets/js/*.js"]
  },

  concat: {

    // The core library files
    "dist/debug/js/libs.js": [
      "assets/js/libs/jquery.js",
      "assets/js/libs/underscore.js",
      "assets/js/libs/backbone.js"
    ],

    // Application files
    "dist/debug/js/app.js": ["app/*.js", "app/modules/*.js"],

    // Your CSS
    "dist/debug/css/style.css": ["assets/css/*.css"]
  },
  
  min: {
    "dist/release/js/libs.js": ["dist/debug/js/libs.js"],
    "dist/release/js/app.js": ["dist/debug/js/app.js"],
    "dist/release/js/templates.js": ["dist/debug/js/templates.js"]
  },

  mincss: {
    "dist/release/css/style.css": ["dist/debug/css/style.css"]
  },

  watch: {
    files: ["assets/**/*", "app/**/*"],
    tasks: "lint:files concat jst",

    min: {
      files: ["assets/**/*", "app/**/*"],
      tasks: "default"
    }
  },

  clean: {
    folder: "dist/"
  }

});

// Run the following tasks...
task.registerTask("default", "lint:files");
