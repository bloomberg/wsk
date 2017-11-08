'use strict';

module.exports = {
  server: {
    baseDir: './', // The local server will serve out of the root directory so your other folders are also accessible via the server, not just `public/`
    directory: true // Give a directory listing when you navigate to a directory that doesn't have an `index.html`
  },
  // These options are passed to chokidar, so see its documentation for more info: https://github.com/paulmillr/chokidar
  // `ignoreInitial: true` says to not reload the server when we first launch it and technically "adds" new files to its internal watch list
  // `ignored` says to ignore sourcemap files. They can be ignored since they are written at the same time as the actual file, so no need to trigger a second reload
  watchOptions: {
    ignoreInitial: true,
    ignored: new RegExp('\\.map$')
  },
  port: 8000, // Start here and increment upwards
  ui: {
    port: 3000 // Start here and increment upwards. BrowserSync provides a handy UI interface.
  },
  ghostMode: false,
  files: 'public/**/*', // What files to watch
  startPath: '/public/index.html', // Where to display to the user on load
  reloadDebounce: 750, // Don't reload if events occur within this many milliseconds of each other
  notify: false, // Don't display messages in the browser when files change or reloads happen.
  open: false, // Don't open up a new browser window when the server starts
  reloadOnRestart: true, // Do reload open browser windows that point to our server if we start or restart the server
  logLevel: 'silent' // Don't log anything, we'll take care of that manually via our notify module
};
