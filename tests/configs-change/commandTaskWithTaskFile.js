var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var tmpFile = tmpPath('change', 'commandTaskWithTaskFile', 'file.test');
io.writeDataSync(tmpFile, 'file', {makeDirs: true});

var commandPath = testPath('clis', 'report.js');

var taskFilePath = testPath('taskFiles', 'report.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: tmpFile,
      events: [
        {
          type: 'change',
          commands: 'node ' + commandPath,
          taskFiles: taskFilePath
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/change/commandTaskWithTaskFile': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/change/commandTaskWithTaskFile/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/change/commandTaskWithTaskFile/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile changed...\u001b[39m \u001b[1mtests/tmp/change/commandTaskWithTaskFile/file.test\u001b[22m'],
    onCommandEvent: [{
      code: 100,
      command: commandPath,
      env: undefined
    }],
    onTaskFileEvent: [{
      eventType: 'change',
      filePath: tmpFile,
      taskFilePath: taskFilePath,
      options: undefined
    }]
  }
};
