'use strict';

/* --------------------------------------------
 *
 *  This function is run whenever a change event occurs
 *  It will notify the user that the event happened
 *  if a `taskFile` is specified, it will run that file
 *
 * --------------------------------------------
 */
var notify = require('../notify.js');
var eventNotices = require('./eventNotices');
var fullPathsToPrjPath = require('./fullPathsToPrjPath');

var spawnCommand = require('./spawnCommand');
var runTask = require('./runTask');

module.exports = function handleEvent (evt, filePath, serviceName, cb) {
  // Report the action we're telling it to do according to the event type
  // Notification strings are defined above
  // For example, if we fire a `change` event, the language reported to the user is `File changed...`
  // See the comments for the `eventNotices` above for more info.
  eventNotices[evt.type].forEach(function (eventNoticeInfo) {
    var notification = notify({
      message: eventNoticeInfo.msg.replace('{{service}}', serviceName),
      value: fullPathsToPrjPath(filePath),
      display: eventNoticeInfo.notifyType
    });
    cb.onEvent(null, notification);
  });

  // If supplied one or more file in `evt.taskFiles` and this file exists,
  // require it as a module and run its `render` function
  // Our compile modules are built to be run with defaults sensible
  // for running on change if nothing passed
  // In the future we could allow for functions to be defined as `taskFiles`
  // directly but that's not as organized as the current setup
  var subProcesses = {};
  evt.commands.forEach(spawnCommand(subProcesses, evt, cb));

  evt.taskFiles.forEach(runTask(filePath, evt, cb));
};
