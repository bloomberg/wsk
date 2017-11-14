'use strict';

var isGlob = require('is-glob');

module.exports = function filterForPaths (warnIfMissingPath) {
  return function (pathCandidate) {
    if (isGlob(pathCandidate)) {
      return false;
    } else if (warnIfMissingPath === false) {
      return false;
    } else {
      return true;
    }
  };
};
