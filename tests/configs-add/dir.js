var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var glob = tmpPath('add', 'dir', '*');
var testFilePath = tmpPath('add', 'dir', 'subdir/');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      testPath: testFilePath, // Add some extra data here just for testing. This file will created to test our add event.
      events: [
        {
          type: 'addDir',
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{}]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/add/dir/*\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mNew basic dir detected. \u001b[90mWatching dir...\u001b[36m\u001b[39m \u001b[1mtests/tmp/add/dir/subdir\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'addDir',
      filePath: testPath('tmp', 'add', 'dir', 'subdir'),
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
