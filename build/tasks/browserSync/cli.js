'use strict';

var path = require('path');
var bs = require('browser-sync').create();
var notify = require('wsk').notify;
var manualReloadEvents = require('./manualReloadEvents.js');

var bsConfig = require('./config.js');
bs.init(bsConfig);

// Event listeners
bs.emitter.on('service:running', function (evt) {
  notify({
    message: 'Serving at...',
    value: evt.url,
    display: 'serve'
  });
});

bs.emitter.on('file:changed', onChange);

function onChange (evt) {
  // Manually reload the browser for the required events
  if (manualReloadEvents.indexOf(evt.event) > -1) {
    bs.reload();
  }

  var msg;
  // CSS is the only unique case to alter our message, so if it's a file / dir add / remove event, notify in the same way as `File change detected`.
  if (path.extname(evt.path) === '.css') {
    msg = 'CSS change detected. Injecting into page...';
  } else {
    msg = 'File change detected. Reloading page...';
  }

  // Tell our users what's goin on
  notify({
    message: msg,
    value: evt.path,
    display: 'reload'
  });
}
