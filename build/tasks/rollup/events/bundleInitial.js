var notify = require('wsk').notify;

module.exports = function (event, fileConfig) {
  notify([{
    message: 'Watching js bundle',
    value: event.input,
    display: 'watch'
  }, {
    message: '... and creating first rollup cache...',
    value: event.input,
    display: 'add'
  }]);
};
