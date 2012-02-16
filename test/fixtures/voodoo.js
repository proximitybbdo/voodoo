config.init({
  clean: {
    files: ["assets/js/libs.js", "assets/js/app.js"]  
  },

  pulverize: {
    options: {
      directory: 'assets/img',  // relative from voodoo base path
      dry: false,               // dryrun test  
      quiet: false,             // force quiet run
      recursive: false,         // Run recursively
      verbose: false            // Run verbosely
    }
  },

  lint: {
    files: ["assets/js/*.js"]
  },

  jshint: {
    options: {
      asi: true,      // semicolons are ok
      curly: false,   // do not require curly braces
      eqeqeq: true,   // must use `===` and `!==`
      immed: true,
      latedef: false,
      newcap: false,  // cap How YoU wAnT
      noarg: true,    // argument.caller and argument.callee are old
      noempty: true,
      sub: true,
      undef: true,    // prevent typos
      strict: false,
      eqnull: true,
      trailing: true, // no trailing spaces on multiline
      browser: true
    },
    globals: {
      jquery: true,
      $: true,
      _gaq: true,
      log: true
    }
  },

  concat: {
    // Application files
    "assets/js/app.js": ["assets/js/*.js"],

    // The core library files
    "assets/js/libs.js": [
      "assets/js/libs/*.js"
    ]
  },

  min: {
    "assets/js/libs.js": ["assets/js/libs.js"],
    "assets/js/app.js": ["assets/js/app.js"]
  },

});

// Run the following tasks...
// task.registerTask("default", "clean lint:files concat min");
task.registerTask("default", "pulverize");
