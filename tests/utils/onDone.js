'use strict';

/* --------------------------------------------
 *
 * Callback to test equality whenever `watcher.js` sends us back some even information
 *
 * --------------------------------------------
 */
// var path = require('path');
var printMismatches = require('./printMismatches');
var _ = require('underscore');

module.exports = function onDone (t, file, name, expectedCallbacks) {
  var counter = 0;
  return function (err, notification, which, i) {
    counter++;
    if (which !== 'onPublicInitDone') {
      t.is(err, null, 'Error is not null');
      let expectedList = file.expected[which];
      let foundIndex = expectedList.findIndex(d => _.isEqual(d, notification));
      let expected;
      if (foundIndex > -1) {
        expected = file.expected[which][foundIndex];
        file.expected[which][foundIndex] = null;
        file.expected[which] = file.expected[which].filter(d => d);
        t.deepEqual(notification, expected, 'Log message doesn\'t match expected');
      } else {
        printMismatches(notification, {name, which, counter});
        t.deepEqual(notification, expectedList.join('\n'), 'Log message doesn\'t match expected');
      }
    } else {
      if (err) {
        if (!_.isEqual(notification, file.expected[which][0].notification)) {
          printMismatches(notification, {name, which, counter: 'n'});
        }
        t.is(err.message, file.expected[which][0].error, 'Error does not match');
      } else {
        t.is(err, null, 'Error is not null');
      }
      if (!_.isEqual(notification, file.expected[which][0].notification)) {
        printMismatches(notification, {name, which, counter: 'n'});
      }
      t.deepEqual(notification, file.expected[which][0].notification, 'Message matches');
    }
    if (counter === expectedCallbacks) {
      t.end();
    }
  };
};
