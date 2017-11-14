'use strict';

var _ = require('underscore');
var notify = require('../notify');
var initWatch = require('./initWatch');
var validateGroup = require('./validateGroup');

module.exports = function processWatchGroup (cb) {
  return function (watchGroup, onDone) {
    // Set up some defaults
    var withDefaults = _.defaults({}, watchGroup, {warnIfMissingPath: true});
    if (!_.isArray(withDefaults.path)) {
      withDefaults.path = [withDefaults.path];
    }
    validateGroup(withDefaults, {
      fail: function (notifySettings) {
        var n = notify(notifySettings);
        cb.onInit(null, n);
        onDone(new Error(notifySettings.message + (notifySettings.value ? ' ' + notifySettings.value : '')));
      },
      warn: function (notifySettings) {
        var n = notify(notifySettings);
        cb.onInit(null, n);
      },
      proceed: function () {
        initWatch(withDefaults, onDone, cb);
      }
    });
  };
};
