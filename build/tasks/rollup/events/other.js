var notify = require('wsk').notify;

var ignoreCodes = ['START', 'END'];

module.exports = function (event) {
  if (ignoreCodes.indexOf(event.code) === -1) {
    notify({
      message: 'Unhandled event code...',
      value: event.code,
      display: 'error',
      error: event.error || undefined
    });
  }
};
