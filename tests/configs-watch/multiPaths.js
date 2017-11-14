var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath1 = tmpPath('watch', 'multiPaths', 'file.test');
var filePath2 = tmpPath('watch', 'multiPaths', 'file-2.test');
var filePath3 = tmpPath('watch', 'multiPaths', 'file.test3');

io.writeDataSync(filePath1, 'file', {makeDirs: true});
io.writeDataSync(filePath2, 'file', {makeDirs: true});
io.writeDataSync(filePath3, 'file', {makeDirs: true});

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: [filePath1, filePath2, filePath3],
      chokidarOptions: {
        ignoreInitial: false
      },
      events: [
        {
          type: 'add',
          taskFiles: taskFilePath
        },
        {
          type: 'change',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{
        'tests/tmp/watch/multiPaths': ['file-2.test', 'file.test', 'file.test3']
      }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file.test, tests/tmp/watch/multiPaths/file-2.test, tests/tmp/watch/multiPaths/file.test3\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file.test3\u001b[22m'],
    onEvent: [
      '\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic file detected. \u001b[90mWatching file...\u001b[36m\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file.test\u001b[22m',
      '\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic file detected. \u001b[90mWatching file...\u001b[36m\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file-2.test\u001b[22m',
      '\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic file detected. \u001b[90mWatching file...\u001b[36m\u001b[39m \u001b[1mtests/tmp/watch/multiPaths/file.test3\u001b[22m'
    ],
    onTaskFileEvent: [{
      eventType: 'add',
      filePath: filePath1,
      taskFilePath: taskFilePath,
      options: undefined
    }, {
      eventType: 'add',
      filePath: filePath2,
      taskFilePath: taskFilePath,
      options: undefined
    }, {
      eventType: 'add',
      filePath: filePath3,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
