'use strict';

var watcher = require('wsk').watcher;
var CONFIG = require('./config');

var watchGroup = [
  {
    serviceName: 'static',
    path: CONFIG.files,
    chokidarOptions: {
      ignored: CONFIG.ignoreOnWatch
    },
    displayOptions: {
      hideChildFiles: true
    },
    events: [
      {
        type: 'change',
        taskFiles: 'build/tasks/statics/onEvent.js'
      },
      {
        type: 'add',
        taskFiles: 'build/tasks/statics/onEvent.js'
      },
      {
        type: 'addDir',
        taskFiles: 'build/tasks/statics/onEvent.js'
      },
      {
        type: 'unlink',
        taskFiles: 'build/tasks/statics/onEvent.js'
      },
      {
        type: 'unlinkDir',
        taskFiles: 'build/tasks/statics/onEvent.js'
      }
    ]
  }
];

watcher.add(watchGroup);
