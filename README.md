wsk.docs
===========

> The documentation site for [wsk](http://github.com/bloomberg/wsk): https://bloomberg.github.io/wsk

## Table of contents

* [What is this project?](#what-is-this-project)
* [Tasks](#tasks)
* [Project commands](#project-commands)
  * [Main commands](#main-commands)
    * [dev](#editing-the-project)
    * [view](#viewing)
  * [Internal / other commands](#internal--other-commands)
    * [build](#building-files)
    * [build-view](#building-and-viewing)
* [File structure](#file-structure)

## What is this project?

This repository contains the code used to generate the documentation for wsk](http://github.com/bloomberg/wsk). It also serves as an example repository for how to build out a complete wsk project. It uses the following technologies

* [Underscore.js](https://underscorejs.org) for templating.
* [Rollup](https://rollupjs.org/) for JavaScript bundling.
* [Stylus](http://stylus-lang.com/) for CSS.
* [fs-extra](https://github.com/jprichardson/node-fs-extra) and Node's built-in `fs` for handling static files.

## Tasks

Each of the tasks in `build/tasks/` has a `README.md` that explains its files and logic. They aim to be as consistent as possible according to the wsk architecture [described in the wsk `README.md`](http://bloomberg.github.io/wsk#architecture) while accommodating the quirks of target libraries.

## Project commands

All of the commands to develop, build and preview this project are accessible via [npm script commands](https://github.com/mhkeller/npm-things/blob/master/docs/2-run-commands.md). As shown below, run each of these with `npm run <command-name>`.

The commands listed below will be your go-tos but there others that are used mostly internally. For a full list of possible commands, look at the `scripts` section of [`package.json`](package.json).

* [Main commands](#main-commands)
  * [dev](#editing-the-project)
  * [view](#viewing)
* [Internal / other commands](#internal--other-commands)
  * [build](#building-files)
  * [build-view](#building-and-viewing)

### Main commands

---

#### Editing the project

```shell
npm run dev
```

**What does it do?**: If you're editing a project it handles all the file building and browser live-reloading for you. So if you have it running while working on a project, it compiles your Stylus files (images, csvs, etc.) and refreshes your browser for you. It's like a big comfy chair that takes care of everything as long as it's running.

1. It compiles your `src/` files into the `public/` folder.
  * Stylus and JavaScript files are packaged into their corresponding bundles
  * Static files such as csvs and images are simply copied over to their corresponding folders in `public/`
2. It launches a live-reload server at <http://localhost:8000>.
3. It watches your files in [`src/`](src) for changes and recompiles them when they do change.

**When do I use it?**: When you are editing this project and you want your changes to the JavaScript, HTML and Stylus files to automatically update in your browser. This is your go-to command for working on this project.

![npm run dev](files/readme-assets/npm-run-dev.gif)

---

### Viewing

```shell
npm run view
```

**What does it do?**: This command creates an http server at <http://localhost:8000>. If you modify any files in `public`, it will live reload.

**When do I use it?**: If you want to view the project without modifying any files such as if you are presenting it or opening up someone else's project and want to test it locally. Or, if you ran `npm run build` and you want to make sure project looks okay to publish.

![npm run view](files/readme-assets/npm-run-view.gif)

## Internal / other commands

---

### Building files

```shell
npm run build
```

**What does it do?**: This command will compile your `src/` files into `public/` folder and minify your CSS and JS. Unlike `npm run dev`, this does not watch files for changes and does not create a server.

**When do I use it?**: You don't need to call this directly because `npm run prelight` will call it automatically. If you are 3,000 percent sure your project is good to publish and you want to bypass `npm run preflight`, you can run this command to bundle and minify your files so they are ready to be published.

![npm run build](files/readme-assets/npm-run-build.gif)

---

### Building and viewing

```shell
npm run build-view
```

**What does it do?**: It's a simple combination of `npm run build` and `npm run view`. After your project builds, you can preview it.

**When do I use it?**: This is used internally after your project passes its preflight checks. You could also use it whenever you would otherwise want to use `npm run build` since it launches a preview server as soon as your project is done building, which is handy to make sure everything looks good.

![npm run build-view](files/readme-assets/npm-run-build-view.gif)

---

## File Structure

This project has the same foundation as the [wsk example project](http://github.com/bloomberg/wsk.example#file-structure) with the following differences:

1. It loads in its HTML based on the `src/html/_pages/input-README.md` file, which should be the readme file from the published version of wsk. Template helpers remove the table of contents and put it in the sidebar.
2. Similarly, the images in the `screenshots` folder of `wsk` should be moved to `src/img`.
2. It uses Stylus instead of Sass, although this will likely be changed in the near future.
