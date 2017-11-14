var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'brokenModule', 'file.test');

var errMsg = 'Error: Could not require taskFile in `basic` watchGroup... tests/taskFiles/brokenModule.js'

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      warnIfMissingPath: false,
      events: [
        {
          type: 'add',
          taskFiles: testPath('taskFiles', 'brokenModule.js')
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: errMsg,
      notification: null
    }],
    onInit: [errMsg]
  }
};
