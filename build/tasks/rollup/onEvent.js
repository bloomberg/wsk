'use strict';

/* --------------------------------------------
 *
 * Create a watcher for a given filePath
 *
 * --------------------------------------------
 */

var _ = require('underscore');

var watch = require('rollup').watch;
var constructOutPath = require('./helpers/constructOutPath');
var CONFIG = require('./config.js')({production: false});

module.exports = {onEvent};

var rollupEvents = require('./events/index');
var watchList = {};

function onEvent (eventType, filePath, opts) {
  var outPath = constructOutPath(filePath, CONFIG);
  var fileConfig = _.extend({}, CONFIG.in, {output: CONFIG.out}, {chokidar: CONFIG.chokidar});
  fileConfig.input = filePath;
  watchList[filePath] = {firstRun: true};
  fileConfig.output.file = outPath;
  initWatcher(watch, fileConfig);
}

function initWatcher (watch, fileConfig) {
  var watcher = watch(fileConfig);

  watcher.on('event', function (event) {
    if (!rollupEvents[event.code]) {
      rollupEvents.other(event, fileConfig);
    } else if (event.code === 'BUNDLE_START' && watchList[fileConfig.input].firstRun === true) {
      rollupEvents.bundleInitial(event, fileConfig);
      watchList[fileConfig.input].firstRun = false;
    } else {
      rollupEvents[event.code](event, fileConfig);
    }
  });
}
