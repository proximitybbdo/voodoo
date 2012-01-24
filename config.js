config.init({

  lint: {
    files: ["assets/js/*.js"]
  },

  concat: {

    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/dd_belatedpng.js",
      "assets/js/libs/jquery-1.7.1.min.js",
      "assets/js/libs/less.js",
      "modernizr-2.0.6.min.js",
      "selectivizr.js"
    ],

    // Application files
    "assets/js/app.js": ["assets/js/*.js"],

    // Your CSS
    // TODO: we won't need this I guess, since
    // we already have a strong include system within
    // our style.less, so generally we stick with one css ?
    // "dist/debug/css/style.css": ["assets/css/*.css"]
  },
  
  // TODO: how do we work on this, in combo with the concat?
  // I am guessing: first minify to name.min.js, than add that
  // min to the concat? Or the other way around?
  min: {
    "dist/release/js/libs.js": ["dist/debug/js/libs.js"],
    "dist/release/js/app.js": ["dist/debug/js/app.js"],
    "dist/release/js/templates.js": ["dist/debug/js/templates.js"]
  },

  // testing only
  mincss: {
    "assets/css/style.css": ["assets/css/style.css"]
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
task.registerTask("default", "lint:files concat");
