'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var io = require('indian-ocean');
var mkdirp = require('mkdirp');
var templatePipe = require('underscore-template-pipe');

var CONFIG = require('./config');
var projectPath = require('../../utils/projectPath');
var getHtmlDir = require('./helpers/getHtmlDir');

var notify = require('wsk').notify;

_.templateSettings = CONFIG.templateRegex;

// Store the path relative to the project directory
var baseDir = path.resolve('./');
// Define this here so we can re-require it on render
var templateHelpers;
// Our config file contents
var config = {};

module.exports = {onEvent: onEvent};

// Our main function that does the template compilation
function onEvent (eventType, filePath, opts) {
  // Clear the cache so that changes to this file will be available via live reload
  delete require.cache[require.resolve(CONFIG.templateHelpersPath)];

  // Grab our template helpers and extend them with the `readTemplate` function so that they can load child templates themselves
  try {
    templateHelpers = _.extend(require(CONFIG.templateHelpersPath), {readTemplate: readTemplate});
  } catch (err) {
    notify({
      message: 'Error reading file',
      value: CONFIG.templateHelpersPath,
      display: 'error',
      error: err
    });
  }

  var outFile;
  // Put this in a try so it doesn't kill the process
  // This makes it so the user can see the error and correct the mistake without having to restart watch process
  try {
    // Parse specified config file. Will read file as JSON if it is a format supported by indian-ocean
    // Extend our config object with our helper functions so they are available for templating
    config = readConfig();

    // If we're passing a filePath to this function, we're bypassing our command line arguments
    // So assign them to `CONFIG.templateInFiles` as a list of just one
    var htmlDir;
    var htmlFiles = CONFIG.templateInFiles;
    // If our filePath isn't inside a child folder of `src/html`, e.g. `src/html/index/index.partial.html`
    // Then rebuild all html templates
    if (filePath && /^src\/html/.test(filePath) && getHtmlDir(filePath) !== 'html') {
      htmlDir = getHtmlDir(filePath);
      // Don't try and build this html folder if its parent dir starts with a `_`. These are files that are in `src/html` but don't get build as individual pages
      // By not setting the CONFIG.templateInFiles to be folder specific, which is the normal flow that happens when a single file has changed, this script will default to out glob above, which will rebuild all folders that contain an `index.partial.html` file, which is what we want
      if (htmlDir.charAt(0) !== CONFIG.htmlIgnorePrefix) {
        // By default we're watching `config.json`, and we might be watching other
        htmlFiles = [path.join(baseDir, 'src', 'html', htmlDir, 'index.partial.html')];
      }
    }

    htmlFiles.forEach(function (tFile) {
      if (eventType !== 'unlink' && io.existsSync(tFile)) {
        var subdir = getHtmlDir(tFile);
        outFile = opts.simpleHtml ? path.join(baseDir, 'public', subdir + '.html') : path.join(baseDir, 'public', subdir !== 'index' ? subdir : '', 'index') + '.html';
        // Turn our template into a function that will output HTML
        var markupFactory = _.template(fs.readFileSync(tFile, 'utf-8'));

        // Extend our config object with template helpers.
        // Note: Keys between these two must not conflict or it will lead to unexpected behavior.
        var markup = markupFactory(config);

        // Make directory if it does not exist
        mkdirp.sync(path.dirname(outFile));

        // Write the file
        fs.writeFileSync(outFile, markup);

        // Notify the user
        notify({
          message: 'Compiled HTML to',
          value: projectPath(outFile),
          display: 'compile'
        });
      }
    });
  } catch (err) {
    notify({
      message: 'Error compiling HTML',
      value: '',
      display: 'error',
      error: err
    });
  }
}

// Allow each template to read in other templates and still have access to config vars
// extend config with an optional data object
// e.g. `<[= readTemplate('project-root/path/to/child-template.partial.html'[, otherData]) ]>`
function readTemplate (filePath, _data) {
  _data = _.extend({}, config, _data || {});
  try {
    return _.template(fs.readFileSync(filePath, 'utf-8'))(_data);
  } catch (err) {
    notify({
      message: 'Error reading template...',
      value: filePath,
      display: 'error',
      error: err
    });
  }
}

// Read in our config file as a templated item
// Remove any strings such as `"<` and `>"` around around child data that is pulled in as json
function readConfig () {
  var helpersObj = {h: templateHelpers};

  var existingConfig = io.readDataSync(CONFIG.configFile);

  var regexVals = _.values(_.templateSettings);

  // For each time this file is read, cache the file contents under its file path so we're not loading the file multiple times
  var helpersImportCache = {};

  // Evalues values in config.json that are wsk templates to their results
  Object.keys(existingConfig).forEach(function (key) {
    var val = existingConfig[key];
    var directive;

    // If it maches any of our wsks template regexes, continue
    var matchesAny = regexVals.some(function (regexVal) {
      directive = regexVal;
      return regexVal.test(val);
    });

    var importDefaults;
    var directiveVal;

    if (matchesAny) {
      // Default settings for the import function
      importDefaults = {
        prettyCopy: true
      };
      // Only supports one tag per key
      // This injects the following `import` function into the `h` namespace for helpers
      // And returns the data given
      // We're using `templatePipe`, which will return json objects
      // This allows us to use dot notation in our template tags with `~` such as `<[~ h.import('src/html/data.json').myField ]>`
      directiveVal = templatePipe(val.match(directive)[0], _.extend({variable: 'h'}, _.templateSettings))(_.extend({
        import: function (filePath, opts) {
          opts = opts || {};

          var fileData;
          // if it's not in our cache, read in the given file path and parse it according to its file extension
          if (!helpersImportCache[filePath]) {
            fileData = helpersImportCache[filePath] = io.readDataSync(filePath);
          } else {
            fileData = helpersImportCache[filePath];
          }
          // Set defaults for options that are not set
          // The only option for now is whether to pass this data through prettyCopy or not
          _.defaults(opts, importDefaults);
          if (opts.prettyCopy && templateHelpers.prettyCopy) {
            // Pretty copy is okay if you pass it an object because it will recursively find strings in that obejct
            fileData = templateHelpers.prettyCopy(fileData);
          }
          return fileData;
        }
      }, templateHelpers));
      // Set the value of this key to the results of the tag value
      existingConfig[key] = directiveVal;
    }
  });

  // Add our helpers onto our config variables so our template has access to them
  _.extend(existingConfig, helpersObj);

  // Send back our now awesomely parsed config object
  return existingConfig;
}
