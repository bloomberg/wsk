'use strict';

module.exports = {
  // Copy these over to `public/`
  files: 'src/**/*',
  // Don't copy these, note, we are only copying over top level directories and files in `src`.
  ignoreOnBuild: [
    'src/css',
    'src/css/modules',
    'src/css/modules/**/*',
    'src/css/*.styl',
    'src/js',
    'src/js/*.js',
    'src/html/**/*',
    'src/html',
    'src/js/modules/**/*',
    'src/js/modules'
  ],
  ignoreOnWatch: ['.gitkeep',
    '.gitignore',
    '**/*.md',
    'src/html',
    'src/html/**/*',
    'src/js/*.js',
    'src/js/modules',
    'src/js/modules/**/*',
    'src/css/*.styl',
    'src/css/modules',
    'src/css/modules/**/*'
  ]
};
