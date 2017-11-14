/* --------------------------------------------
 *
 * Watch files and run task files when they change
 *
 * --------------------------------------------
 */
var _ = require('underscore');
var queue = require('d3-queue').queue;
var processWatchGroup = require('./lib/processWatchGroup');
var identity = function () {};

function add (watchGroups, onDone, testsCb) {
  if (!_.isArray(watchGroups)) {
    watchGroups = [watchGroups];
  }
  onDone = onDone || identity;
  // Add this hook for testing
  testsCb = _.defaults({}, testsCb || {}, {
    onInit: identity,
    onEvent: identity,
    onCommandEvent: identity,
    onTaskFileEvent: identity
  });

  var q = queue();

  // Loop through each file directive
  watchGroups.forEach(function (watchGroup) {
    q.defer(processWatchGroup(testsCb), watchGroup);
  });
  q.awaitAll(function (err, onDones) {
    onDone(err, onDones);
  });
}

module.exports = { add };
