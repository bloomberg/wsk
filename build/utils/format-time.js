'use strict';

/* --------------------------------------------
 *
 * Pretty-print milliseconds into their most-sensible units, up to a minute
 *
 * --------------------------------------------
 */

module.exports = function millisecondsToString (milliseconds) {
  var oneHour = 3600000;
  var oneMinute = 60000;
  var oneSecond = 1000;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var result;

  if (milliseconds >= oneHour) {
    hours = Math.floor(milliseconds / oneHour);
  }

  milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

  if (milliseconds >= oneMinute) {
    minutes = Math.floor(milliseconds / oneMinute);
  }

  milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

  if (milliseconds >= oneSecond) {
    seconds = Math.floor(milliseconds / oneSecond);
  }

  milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

  if (minutes) {
    result = minutes + 'm';
    if (seconds) {
      result += (' ' + seconds + 's');
    }
  } else if (seconds && !milliseconds) {
    result = seconds + 's';
  } else if (seconds && milliseconds) {
    result = seconds + (Math.round((milliseconds / 1000) * 100) / 100) + 's';
  } else if (milliseconds) {
    result = milliseconds + 'ms';
  }

  return result;
};
