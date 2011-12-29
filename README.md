Voodoo
======

Build system for our sites. When invoked, it performs so called 'needles', which contain a series of tasks such as link checking, javascript checking, css minification, ... You can create a `needles` folder yourself and invoke `voodoo` besides it.

Installation
------------
`npm install voodoo`

Usage
-----
Inside your project folder:

`voodoo`

When you have a `needles` folder, voodoo will include and execute each javascript file (coffee script will be added later). Be sure that those files can run as standalone, so you have to install all required modules yourself.
