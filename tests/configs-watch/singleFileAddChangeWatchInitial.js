var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('watch', 'singleFileAddChangeWatchInitial', 'file.test');
io.writeDataSync(filePath, 'file', {makeDirs: true});

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
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
      notification: [{'tests/tmp/watch/singleFileAddChangeWatchInitial': ['file.test']}]
    }],
    onInit: ['[[90m00:00:00.00[39m | [1m[34mwsk[39m[22m] [90mWatching basic bundle...[39m [1mtests/tmp/watch/singleFileAddChangeWatchInitial/file.test[22m\n[[90m00:00:00.00[39m | [1m[34mwsk[39m[22m] [90m---[39m [1mtests/tmp/watch/singleFileAddChangeWatchInitial/file.test[22m'],
    onEvent: ['\n[[90m00:00:00.00[39m | [1m[34mwsk[39m[22m] [36mNew basic file detected. [90mWatching file...[36m[39m [1mtests/tmp/watch/singleFileAddChangeWatchInitial/file.test[22m'],
    onTaskFileEvent: [{
      eventType: 'add',
      filePath: filePath,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
