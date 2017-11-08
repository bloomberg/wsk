'use strict';

module.exports = function prettyPrintError (err) {
  console.log('\n' + err.name + ':', err.message);
  var errPointer;
  if (err.line > 1) {
    // When not minified
    console.log('\n\n' + err.source.split('\n').slice(err.line - 5, err.line).map(d => '|  ' + d).join('\n'));
    errPointer = new Array(err.column).join('-') + '^';
  } else {
    // Minified
    console.log('\n\n' + err.source.substr(err.column - 25, err.column));
    errPointer = new Array(22).join('-') + '^';
  }
  console.log('---' + errPointer);
};
