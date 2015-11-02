# polymer-startup
Starter web app using Polymer, Bower, Node, Express, Gulp, Polybuild, and BrowserSync

## Getting Started
```
git clone https://github.com/kd7yva/polymer-startup.git
cd polymer-startup
npm install
```
package.json is configured to automatically run bower install & gulp build after the npm install

## Start in Development Mode
```
gulp dev
```
This will start the gulp script which will in turn build the app, start the node process, and start browser-sync.  To stop the gulp process, node process, and browser-sync just use `ctrl-c`.

## Start in Production Mode
```
npm start
```
This will start the node process directly.  To stop the node process just use `ctrl-c`.

## How the Project is Structured
The `/server` folder contains the node.js application.

The `/css`, `/images`, `/js`, `/elements`, and `/bower_components` folders contain the source files for the web client.

All of the above folders get built into the `/built` folder.  Each folder has its own gulp task to process and copy the contents into the `/built` folder.

Both the development and production modes run against the `/built` folder.  When running in development mode, gulp watches for file changes in the folders listed above.  When a file change occurs gulp triggers that folder's build task, placing the built output into the `/built` folder.  When running in production mode, node is started directly, and no file watching or building is done.

## Creating Web Components
Custom web components are placed in the `/elements` folder.  Each custom web component within its own folder, i.e. `/elements/x-logo`.  The `/elements/x-logo/x-logo.html` file is an example of a simple custom web component.

The index page has a file, `/elements/elements-index.html`, where all of the needed web components are listed as imports.  By listing the needed web components of the index page here, the index page is instead able to link to the one built ouput of the polybuild gulp plugin.

If you add more html pages to the project, you will need to create a file for each page like the `/elements/elements-index.html`.  As well, in the `/gulpfile.js` you will need to add additional gulp tasks like the `build-elements-index` task, and include the new gulp task in the list of dependnecies of the `build-elements` gulp task.

