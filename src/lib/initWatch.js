'use strict';

/* --------------------------------------------
 *
 * Send our file paths and watch options to chokidar to do the watching
 *
 * --------------------------------------------
 */
var path = require('path');
var chokidar = require('chokidar');
var _ = require('underscore');

var notify = require('../notify.js');

var fullPathsToPrjPath = require('./fullPathsToPrjPath');
var handleEvent = require('./handleEvent');
var printWatchTree = require('./printWatchTree');
var shortenWatchTree = require('./shortenWatchTree');

module.exports = function initWatch (watchGroup, onDone, cb) {
  // Normalize the options we're passing to chokidar
  var chokidarOptions = _.defaults(watchGroup.chokidarOptions || {}, {
    ignored: [],
    ignoreInitial: true
  });

  // Normalize the display options
  var displayOptions = _.defaults(watchGroup.displayOptions || {}, {
    hideChildFiles: false,
    hideChildDirs: false,
    hideAll: false
  });

  // Add our ignored dot files default
  if (_.isUndefined(watchGroup.ignoreDotFiles) || watchGroup.ignoreDotFiles === true) {
    chokidarOptions.ignored = [/[/\\]\./].concat(chokidarOptions.ignored);
  }

  // Hydrate our taskFiles and do some error checking
  var hasErr = false;
  watchGroup.events.forEach(evt => {
    _.defaults(evt, {commands: [], taskFiles: []});
    if (evt.commands) {
      evt.commands = _.isArray(evt.commands) ? evt.commands : [evt.commands];
    }
    if (evt.taskFiles) {
      let taskFiles = evt.taskFiles || [];
      taskFiles = _.isArray(evt.taskFiles) ? evt.taskFiles : [evt.taskFiles];
      evt.taskFiles = taskFiles.map(d => {
        var module;
        var modulePath = path.join(path.resolve('./'), d);
        var moduleShortPath = fullPathsToPrjPath(modulePath);
        try {
          module = require(modulePath);
        } catch (err) {
          let msg = `Error: Could not require taskFile in \`${watchGroup.serviceName}\` watchGroup...`;
          notify({
            message: msg,
            value: moduleShortPath,
            display: 'error',
            error: err
          });
          let errMessage = msg + ' ' + moduleShortPath;
          onDone(new Error(errMessage));
          cb.onInit(null, errMessage);
          hasErr = true;
          return false;
        }
        if (!module.onEvent || !_.isFunction(module.onEvent)) {
          let msg = `Error: Task file for \`${watchGroup.serviceName}\` does not export an \`onEvent\` function...`;
          let n = notify({
            message: msg,
            value: d,
            display: 'error'
          });
          onDone(new Error(msg + ' ' + d));
          cb.onInit(null, n);
          hasErr = true;
          return false;
        }
        return {
          path: d,
          module: module
        };
      });
    }
  });
  if (hasErr) {
    return false;
  }

  // Initialize watcher
  var watcher = chokidar.watch(watchGroup.path, chokidarOptions);

  // Add an error event handler
  /* istanbul ignore next */
  watcher.on('error', function (err) {
    var msg = `Error: Problem watching group...`;
    var n = notify({
      message: msg,
      value: watchGroup.serviceName,
      display: 'error',
      error: err
    });
    onDone(msg + ' ' + watchGroup.serviceName);
    cb.onInit(null, n);
  });

  // Add a ready event handler, which we will use to notify the user that we are watching this file or group of files
  watcher.on('ready', function () {
    if (displayOptions.hideAll === true) {
      cb.onInit(null, '');
      onDone(null, shortenWatchTree(watcher.getWatched()));
      return false;
    }
    // Notify the user that we are watching the file paths or blobs they specified
    var fullPaths = fullPathsToPrjPath(watchGroup.path);
    // If we passed in an array of paths, print them here separated by commas
    if (_.isArray(fullPaths)) {
      fullPaths = fullPaths.join(', ');
    }
    var notification = notify({
      message: 'Watching ' + watchGroup.serviceName + ' bundle...',
      value: fullPaths,
      display: 'watch',
      silent: true
    });

    // Also notify the resulting files that chokidar found in the system
    // The difference between the above notifcation and this one is two-fold:
    // 1. This is handy for verification. We told chokidar to watch `config.json` but now chokidar is telling us,
    // "Hey config.json is one of the things I'm watching"
    // 2. If we passed chokidar a glob such as `src/html/**/*`, this will report out the individual files it
    // found such as `src/html/body.jst` and others
    if (displayOptions.hideChildDirs === true && displayOptions.hideChildFiles === true) {
      onDone(null, shortenWatchTree(watcher.getWatched()));
      cb.onInit(null, notification);
      return false;
    }
    // Get the files that chokidar is watching
    var watchedFiles = watcher.getWatched();
    printWatchTree(watchedFiles, notification, displayOptions, onDone, cb);
  });

  // Loop through our events and add those listeners
  // When that event trigger, run the `handleEvt` function,
  // which will notify and optionally run a `taskFile` if one is specified
  watchGroup.events.forEach(function (evt) {
    watcher.on(evt.type, function (filePath) {
      handleEvent(evt, filePath, watchGroup.serviceName, cb);
    });
  });
};
