var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('unlink', 'targetFilesMultiple', 'file.test');
// Write the file we are going to be deleting
io.writeDataSync(filePath, 'test', {makeDirs: true});

var glob = tmpPath('unlink', 'targetFilesMultiple', '*.test');

var taskFilePath = testPath('taskFiles', 'report.js');
var targetFile2 = tmpPath('unlink', 'targetFilesMultiple', 'file-2.test');
var targetFile3 = tmpPath('unlink', 'targetFilesMultiple', 'file-3.test');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: glob,
      testPath: filePath,
      events: [
        {
          type: 'unlink',
          taskFiles: taskFilePath,
          targetFiles: [
            targetFile2,
            targetFile3
          ]
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/unlink/targetFilesMultiple': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/unlink/targetFilesMultiple/*.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/unlink/targetFilesMultiple/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile removal detected...\u001b[39m \u001b[1mtests/tmp/unlink/targetFilesMultiple/file.test\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'unlink',
      filePath: targetFile2,
      taskFilePath: taskFilePath,
      options: undefined
    }, {
      eventType: 'unlink',
      filePath: targetFile3,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
