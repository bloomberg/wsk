'use strict';

var rimraf = require('rimraf');
var io = require('indian-ocean');
var notify = require('wsk').notify;
var copyByGlob = require('./helpers/copyByGlob');

io.exists('public', (err, exists) => {
  if (err) {
    notify({
      message: 'Error checking if exists',
      value: 'public/',
      display: 'error',
      error: err
    });
  } else if (exists) {
    rimraf('public', {glob: false}, function (err) {
      if (err) {
        notify({
          message: 'Error deleting `public/` folder... Aborting.',
          value: '',
          display: 'error',
          err: err
        });
      } else {
        notify({
          message: 'Deleted',
          value: 'public/',
          display: 'compile'
        });
        copyByGlob();
      }
    });
  } else {
    copyByGlob();
  }
});
