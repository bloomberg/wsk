var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'missingOnEvent', 'file.test');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: testPath('taskFiles', 'missingOnEvent.js')
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: 'Error: Task file for `basic` does not export an `onEvent` function... tests/taskFiles/missingOnEvent.js',
      notification: null
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[31mError: Task file for `basic` does not export an `onEvent` function...\u001b[39m \u001b[1mtests/taskFiles/missingOnEvent.js\u001b[22m']
  }
};
