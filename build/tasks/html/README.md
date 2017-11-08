HTML task
===

## What does this do?

Compiles any `index.partial.html` in `src/html/<subdir>/` into the public folder as an HTML file. If the `<subdir>` folder is named index, it will create `public/index.html`. If it is named anything else, it will create `public/<subdir>/index.html`. Directories beginning with the `htmlIgnorePrefix` are not built, but changes to files in that folder trigger rebuilds.

You can also configure this task via the `simpleHTML` option in `config.js` to always create HTML files named after the `<subdir>`.

Templates use Underscore.js templating with slightly different syntax: `%` are replaced with open and close brackets. This is so that you can use normal Underscore or EJS template tags client-side and the build step won't conflict with them.

```html
<%= title %> becomes <[= title ]>
<%- title %> becomes <[- title ]>
<% var title = 'hello' %> becomes <[ var title = 'hello' ]>
```

*Note:* The logic in this task could be further refactored to better handle globs versus single files. Currently, the `onEvent-build.js` file handles both the "all" and the "single-file" scenarios. The two onEvent files could also be combined into one controller and different modules like the static task.

## What files are here

* `cli.js` — Currently just delegates to `onEvent-build.js`.
* `config.js` — Templating and file in settings.
* `onEvent-build.js` — Compile HTML templates.
* `onEvent-remove.js` — Remove built HTML pages when you delete a folder in `src/html/<subdir>`.
* `watch.js` — Watch specification.

#### Helper modules

* `getHtmlDir.js` — Get the name of the parent directory of a file.

## Usage

In package.json:

```
"build:html": "node build/tasks/html/cli.js",
"dev:html": "node build/tasks/html/watch.js"
```
