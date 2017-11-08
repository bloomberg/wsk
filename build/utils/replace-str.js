'use strict';

/* --------------------------------------------
 *
 * Recursively inspect an object's properties until you find a string
 *
 * --------------------------------------------
 */

function replaceStr (objSource, taskFn) {
  if (typeof objSource === 'object') {
    if (objSource === null) return null;

    if (objSource instanceof Array) {
      for (var i = 0; i < objSource.length; i++) {
        objSource[i] = replaceStr(objSource[i], taskFn);
      }
    } else {
      for (var property in objSource) {
        objSource[property] = replaceStr(objSource[property], taskFn);
      }
    }
    return objSource;
  }

  if (typeof objSource === 'string') {
    return taskFn(objSource);
  }
  return objSource;
}

module.exports = replaceStr;
