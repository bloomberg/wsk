var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('unlink', 'targetFiles', 'file.test');
// Write the file we are going to be deleting
io.writeDataSync(filePath, 'test', {makeDirs: true});
var glob = tmpPath('unlink', 'targetFiles', '*.test');
var targetPath = tmpPath('unlink', 'targetFiles', 'file-2.test');

var taskFilePath = testPath('taskFiles', 'report.js');

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
          targetFiles: targetPath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/unlink/targetFiles': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/unlink/targetFiles/*.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/unlink/targetFiles/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile removal detected...\u001b[39m \u001b[1mtests/tmp/unlink/targetFiles/file.test\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'unlink',
      filePath: targetPath,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
