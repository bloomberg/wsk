'use strict';

var io = require('indian-ocean');
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');

var CONFIG = {
  filesToBundle: 'src/js/*.js',
  outDir: 'public/js/',
  outFileExt: '.pkgd.js',
  nameTemplate: '{{name}}',
  chokidar: {
    ignoreInitial: true
  }
};

CONFIG.outFileTemplate = CONFIG.outDir + CONFIG.nameTemplate;

module.exports = function (opts) {
  var plugins = [commonjs(), nodeResolve(), babel({exclude: 'node_modules/**'})];
  if (opts.production === true && process.env.WSK_DEV !== 'true') {
    plugins.push(uglify());
  }
  return io.extend(CONFIG, {
    in: {
      input: null,
      plugins: plugins,
      acorn: {
        allowReserved: true
      },
      onwarn: ({ code, loc, frame, message }) => {
        if (code === 'EMPTY_BUNDLE') return;

        // print location if applicable
        if (loc) {
          console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
          if (frame) console.warn(frame);
        } else {
          console.warn(message);
        }
      }
    },
    out: {
      format: 'iife',
      exports: 'none',
      file: null,
      sourcemap: opts.production !== true
    }
  });
};
