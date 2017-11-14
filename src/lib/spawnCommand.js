'use strict';

var child = require('child_process');
var notify = require('../notify.js');

module.exports = function spawnCommand (subProcesses, evt, cb) {
  return function (command, i) {
    subProcesses[i] = child.spawn(command, {shell: true, stdio: 'inherit', env: evt.env});
    /* istanbul ignore next */
    subProcesses[i].on('error', function (err) {
      var msg = 'Error running command...';
      notify({
        message: msg,
        value: command,
        display: 'error',
        error: err
      });
      cb.onCommandEvent(null, msg);
    });
    subProcesses[i].on('close', function (code) {
      if (code === 127) {
        let en = notify({
          message: 'Error running command...',
          value: command,
          display: 'error'
        });
        cb.onCommandEvent(null, en);
      }
      var spawnArg;
      // Take just the filename which is handled differently in different version of node
      /* istanbul ignore if */
      if (subProcesses[i].spawnargs.length === 1) {
        spawnArg = subProcesses[i].spawnargs[0];
      } else {
        spawnArg = subProcesses[i].spawnargs[2];
      }
      var fileParts = spawnArg.split(' ');
      cb.onCommandEvent(null, { command: fileParts[fileParts.length - 1], env: evt.env, code: code });
    });
  };
};
