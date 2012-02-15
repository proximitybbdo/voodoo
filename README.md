Voodoo
======

Build system for our sites. When invoked, it performs so called 'needles', which contain a series of tasks such as link checking, javascript checking, css minification, ...

# [![Build Status](https://secure.travis-ci.org/proximitybbdo/voodoo.png)](http://travis-ci.org/proximitybbdo/voodoo)

Install
-------
`npm install -g voodoo`

Usage
-----
Inside your website directory, just execute `voodoo` without params to perform the basic tasks, as predefined for our framework (see `config.js` inside the repo)

You can also use these parameters:
```
      -b, --base <path>   working directory for your site (where `assets` folder is in )
      -v, --verbose       verbose output
      -f, --force         a way to force your way past warnings. Want a suggestion? Don't use this option, fix your code
      -c, --config        an optional config.js file, replacing the build in config.js
```

            .-.'  '.-.
           __  \\//  __
          '_ `\\||//` _'
          ' '\/`""`\/' '
           .-/ o  o \-.
    ()-------\_-==-_/
           ____)  (____
        .--\   \__/   /--.
        '--/__      __\--'
              |____|--------()
     ()-------/~~~~\
             /      \
            <_/\__/\_>
           _/  /  \  \_
          (___/    \___)

