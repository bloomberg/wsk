var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('add', 'multiWatchGroup', 'file.test');
var filePath2 = tmpPath('add', 'multiWatchGroup', 'file-2.test');
var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        }
      ]
    },
    {
      serviceName: 'basic',
      path: filePath2,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{}, {}]
    }],
    onInit: [
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/add/multiWatchGroup/file.test\u001b[22m',
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/add/multiWatchGroup/file-2.test\u001b[22m'
    ],
    onEvent: [
      '\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic file detected. \u001b[90mWatching file...\u001b[36m\u001b[39m \u001b[1mtests/tmp/add/multiWatchGroup/file.test\u001b[22m',
      '\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic file detected. \u001b[90mWatching file...\u001b[36m\u001b[39m \u001b[1mtests/tmp/add/multiWatchGroup/file-2.test\u001b[22m'
    ],
    onTaskFileEvent: [{
      eventType: 'add',
      filePath: filePath,
      taskFilePath: taskFilePath,
      options: undefined
    }, {
      eventType: 'add',
      filePath: filePath2,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
