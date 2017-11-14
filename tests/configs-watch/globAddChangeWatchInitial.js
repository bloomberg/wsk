var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('watch', 'globAddChangeWatchInitial', 'file.test');
io.writeDataSync(filePath, 'file', {makeDirs: true});
var filePath2 = tmpPath('watch', 'globAddChangeWatchInitial', 'file-2.test');
io.writeDataSync(filePath2, 'file', {makeDirs: true});

var glob = tmpPath('watch', 'globAddChangeWatchInitial', '*.test');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  // Test this as an object, not an array
  watchGroups: {
    serviceName: 'basic',
    path: glob,
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
  },
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/watch/globAddChangeWatchInitial': [ 'file-2.test', 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/watch/globAddChangeWatchInitial/*.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/globAddChangeWatchInitial/file-2.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/watch/globAddChangeWatchInitial/file.test\u001b[22m'],
    onEvent: [
      '\n[[90m00:00:00.00[39m | [1m[34mwsk[39m[22m] [36mNew basic file detected. [90mWatching file...[36m[39m [1mtests/tmp/watch/globAddChangeWatchInitial/file-2.test[22m',
      '\n[[90m00:00:00.00[39m | [1m[34mwsk[39m[22m] [36mNew basic file detected. [90mWatching file...[36m[39m [1mtests/tmp/watch/globAddChangeWatchInitial/file.test[22m'
    ],
    onTaskFileEvent: [{
      eventType: 'add',
      filePath: filePath2,
      taskFilePath: taskFilePath,
      options: undefined
    }, {
      eventType: 'add',
      filePath: filePath,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
