'use strict';

/* --------------------------------------------
 *
 * The shared testing function that runs each test config file.
 * Examines our expectations as described in the config file and sets up a test plan.
 *
 * --------------------------------------------
 */
var _ = require('underscore');
var watcher = require('../../src/index').watcher;
var onDone = require('./onDone');

module.exports = (on, testFile) => {
  return t => {
    var file = testFile.file;
    var expectedCallbacks = _.chain(file.expected).values().reduce(function (memo, val) {
      return val.length + memo;
    }, 0).value();
    // We run two asserts per test, one for the err being null and the second for string equality
    t.plan(expectedCallbacks * 2);
    var thisDone = onDone(t, file, testFile.name, expectedCallbacks);
    var cbCounters = {};
    var expectedFns = _.mapObject(file.expected, function (val, key) {
      return on(key, cbCounters, file.watchGroups, thisDone);
    });
    watcher.add(file.watchGroups, expectedFns.onPublicInitDone, _.omit(expectedFns, 'onPublicInitDone'));
  };
};
