var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'nonExistentFile', 'file.test');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      events: [
        {
          type: 'add',
          taskFiles: testPath('taskFiles', 'report.js')
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{}]
    }],
    onInit: [
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[1m\u001b[33mWarning: the file you asked to watch does not exist...\u001b[39m\u001b[22m \u001b[1mtests/tmp/errors/nonExistentFile/file.test\u001b[0m\nTo disable this warning, set `warnIfMissingPath: false` in your watchGroup config.\n\u001b[0m\u001b[22m',
      '[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/errors/nonExistentFile/file.test\u001b[22m'
    ]
  }
};
