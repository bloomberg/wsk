'use strict';

/* --------------------------------------------
 *
 * Validation tests for watchGroups
 * Each validation test should call back to cb.fail if there is fail sending back a
 * wsk-notify object to be instantiated
 * If testing async, use a q and send failing errors to the first argument, wsk-object warnings to the second
 * and nothing for both if test passes
 *
 * --------------------------------------------
 */
var _ = require('underscore');
var chalk = require('chalk');

var validatePath = require('./validatePath');
var filterForPaths = require('./filterForPaths');
var queue = require('d3-queue').queue;

module.exports = function validateGroup (watchGroup, cb) {
  var q = queue();

  /* --------------------------------------------
   * Check events is an array
   */
  if (!_.isArray(watchGroup.events)) {
    let nS = {
      message: `Error: No events specified for \`${watchGroup.serviceName}\` service.`,
      display: 'error',
      silent: true
    };
    cb.fail(nS);
    return false;
  }

  /* --------------------------------------------
   * Check we have either commands or tasksFiles
   */
  watchGroup.events.forEach(evt => {
    if (!evt.taskFiles && !evt.commands) {
      let msg = `Error: No \`taskFiles\` or \`commands\` set for \`${watchGroup.serviceName}\` service's event...`;
      let nS = {
        message: msg,
        value: evt.type,
        display: 'error'
      };
      cb.fail(nS);
      return false;
    }
  });

  /* --------------------------------------------
   * Check our paths are either globs or if file paths, that they exist, if we care about that
   */
  var pathsToTest = watchGroup.path.filter(filterForPaths(watchGroup.warnIfMissingPath));
  var hintStr = chalk.reset('\nTo disable this warning, set `warnIfMissingPath: false` in your watchGroup config.\n');
  pathsToTest.forEach(pathToTest => {
    var messageValue = {
      message: 'Warning: the file you asked to watch does not exist...',
      value: pathToTest + hintStr
    };

    q.defer(validatePath(messageValue), pathToTest);
  });

  /* --------------------------------------------
   * Check that our taskFiles exist
   */
  watchGroup.events.forEach(evt => {
    if (evt.taskFiles) {
      let taskFiles = _.isArray(evt.taskFiles) ? evt.taskFiles : [evt.taskFiles];
      taskFiles.forEach(pathToTest => {
        var messageValue = {
          message: `Error: Task file for \`${watchGroup.serviceName}\` service's \`${evt.type}\` event does not exist.`,
          value: pathToTest
        };
        q.defer(validatePath(messageValue), pathToTest);
      });
    }
  });

  /* --------------------------------------------
   * General purpose error reporter
   * The first argument are failing errors
   * Second argument are warnings
   */
  q.awaitAll(function (nS, warnings) {
    /* istanbul ignore if */
    if (nS) {
      cb.fail(nS);
      return false;
    }
    // Send any warnings back out to report
    warnings.filter(nS => nS).forEach(nS => cb.warn(nS));
    // And then proceed
    cb.proceed();
  });
};
