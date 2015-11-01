# polymer-startup
Starter web app using Polymer, Bower, Node, Express, Gulp, Polybuild, and BrowserSync

## Getting Started
```
git clone https://github.com/kd7yva/polymer-startup.git
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
