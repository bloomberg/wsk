var tmpPath = require('../utils/tmpPath');

var filePath = tmpPath('errors', 'noEventsArray', 'file.test');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: filePath,
      warnIfMissingPath: false
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: 'Error: No events specified for `basic` service.',
      notification: null
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[31mError: No events specified for `basic` service.\u001b[39m']
  }
};
