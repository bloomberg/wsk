'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer-stylus')({ browsers: ['last 4 versions'] });
var plugins = ['rupture'];

var CONFIG = {
  use: plugins.map(function (plugin) { return require(plugin).call(); }).concat([autoprefixer]),
  filePath: 'src/css/*.styl', // Specify your Stylus files
  watchModules: 'src/css/modules/**/*.styl', // Specify your Stylus module files to watch
  outStem: 'public/css/', // Specify your out CSS out file directory
  searchPaths: [path.resolve('./', 'src/css')] // Where to look for Stylus modules
};

// The top level watch will be the same as our file paths
CONFIG.watchTopLevel = CONFIG.filePath;

module.exports = CONFIG;
