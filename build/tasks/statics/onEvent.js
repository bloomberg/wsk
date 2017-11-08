'use strict';

var eventsToActions = require('./helpers/eventsToActions');
var actionsToFns = require('./helpers/actionsToFns');

var notify = require('wsk').notify;

module.exports = {onEvent: onEvent};

// Our main function!
function onEvent (eventType, filePath) {
  // If we're calling this function with an event type and file path
  // Build just that file or folder
  // Otherwise copy the entire `src` directory into `public`, except for files we are ignoring
  if (eventType && filePath) {
    // Handle any potential errors where we are given actions we don't know what to do with
    if (!eventsToActions[eventType]) {
      notify({
        message: 'Incoming event type `' + eventType + '` is not assigned a build action',
        value: filePath,
        display: 'error'
      });
    }
    // Same as above, error handling with what functions we're telling it to use
    if (!actionsToFns[eventsToActions[eventType]]) {
      notify({
        message: 'Specified action `' + eventsToActions[eventType] + '` has no build action',
        value: filePath,
        display: 'error'
      });
    }
    // Do the action!
    actionsToFns[eventsToActions[eventType]](filePath);
  }
}
