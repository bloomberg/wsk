'use strict';

var exists = require('../utils/exists');
var _ = require('underscore');

module.exports = function validatePath (messageValue) {
  return function (pathToTest, cb) {
    exists(pathToTest, function (err, exists) {
      /* istanbul ignore if */
      if (err) {
        let nS = {
          message: 'Error testing whether path exists...',
          value: pathToTest,
          display: 'error',
          error: err
        };
        cb(nS);
      } else if (exists === false) {
        var nS = _.extend({
          display: 'warn'
        }, messageValue);
        cb(null, nS);
      } else {
        cb();
      }
    });
  };
};
