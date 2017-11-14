'use strict';

var _ = require('underscore');

module.exports = function runTask (filePath, evt, cb) {
  return function (taskInfo) {
    // We pass it the event type and the file path in case that task file has different directives accordingly
    // Per convention, task files can have an `onEvent` function
    // Change the filePath to any user-specified filePath on this event configuration
    if (evt.targetFiles) {
      if (_.isString(evt.targetFiles) || _.isArray(evt.targetFiles)) {
        filePath = evt.targetFiles;
      } else if (_.isFunction(evt.targetFiles)) {
        filePath = evt.targetFiles(filePath);
      }
    }
    // Also allow for a list of things
    if (!_.isArray(filePath)) {
      filePath = [filePath];
    }
    // Call the `onEvent` of this task file
    filePath.forEach(function (singleFilePath, i) {
      taskInfo.module.onEvent(evt.type, singleFilePath, evt.options, cb.onTaskFileEvent);
    });
  };
};
