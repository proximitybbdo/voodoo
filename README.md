# Voodoo

Build system for our sites. When invoked, it performs so called 'needles', which contain a series of tasks such as link checking, javascript checking, css minification, ... 

It is build on top of the wonderful [grunt](https://github.com/cowboy/grunt).

Since Voodoo was primary build for our own projects, the default **voodoo.js** config file (this is actually just the grunt `config.js` file) will execute a series of tasks tailor made for our framework. This following needles are stung:

        task.registerTask("default", "clean lint:files concat min");

* the **clean** needle, removing `assets/js/app.js` and `assets/js/libs.js` if they existed from a previous run
* the **lint** needle, checking all `*.js` files inside `assets/js/` (**NOT** inside the subsequent `libs` folder) against [jshint](http://www.jshint.com/). Options are set in the `voodoo.js`
* the **concat** needle, concatenating `assets/js/*.js` into `assets/js/app.js` (which is why we needed the **clean** needle), and all `assets/js/libs/*.js` files into `assets/js/libs.js`
* the **min** needle, minifying the previous two `js` files

## Install

Installation is through [npm](http://npmjs.org/), and straightforward:
`npm install -g voodoo`

Run `voodoo -h` afterwards to get more help.

## Usage

Inside your website directory, just execute `voodoo` without params to perform the basic tasks, as predefined for our framework (see `config.js` inside the repo)

The following parameters are available

* **-b, --base <path>** - working directory for your site (where `assets` folder is in )
* **-v, --verbose** - verbose output
* **-f, --force** - a way to force your way past warnings. Want a suggestion? Don't use this option, fix your code
