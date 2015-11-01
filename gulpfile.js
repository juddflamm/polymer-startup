var gulp = require('gulp');
var polybuild = require('polybuild');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;

// Reference to running node process
var node_process;

gulp.task('build-server', function() {
  return gulp.src(['server/**/*'])
  .pipe(gulp.dest('built'));
});

gulp.task('build-css', function() {
  return gulp.src(['css/**/*'])
  .pipe(gulp.dest('built/public/css'));
});

gulp.task('build-images', function() {
  return gulp.src(['images/**/*'])
  .pipe(gulp.dest('built/public/images'));
});

gulp.task('build-bower-components', function() {
  return gulp.src(['bower_components/**/*'])
  .pipe(gulp.dest('built/public/bower_components'));
});

gulp.task('build-js', function() {
  return gulp.src(['js/**/*'])
  .pipe(gulp.dest('built/public/js'));
});

gulp.task('build-elements', ['build-elements-index']);
// Uncomment the below line when you add another page,
// rename to match the page name,
// uncomment the associated gulp task below, and rename the same
// gulp.task('build-elements', ['build-elements-index','build-elements-another-page']);
gulp.task('build-elements-index', function() {
  return gulp.src('elements/elements-index.html')
  .pipe(polybuild({maximumCrush: true}))
  .pipe(gulp.dest('built/public/elements'));
});
// gulp.task('build-elements-another-page', function() {
//   return gulp.src('elements/elements-another-page.html')
//   .pipe(polybuild({maximumCrush: true}))
//   .pipe(gulp.dest('built/public/elements'));
// });

gulp.task('clean', function() {
  return del(['built/**/*']);
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    ['build-server','build-css','build-images','build-bower-components','build-js','build-elements'],
    cb
  );
});

gulp.task('browser-sync', function(cb) {
    browserSync.init({
        proxy: "localhost:5000"
    });
    cb();
});

// Function for calling browserSync.reload, and the gulp callback
var browserSyncReload = function(cb){
  browserSync.reload();
  // Very Important that we call the callback 'cb' at the end of this,
  // because the browserSync.reload function doesn't tell gulp it is done
  cb();
};
// Gulp task to wrap the browserSyncReload function above
gulp.task('browserSyncReload', browserSyncReload);

// When we update the server files, don't reload the browser
// Reloading won't wait until node is all the way up and running
gulp.task('update-server', function(cb) {
  runSequence(
    'build-server',
    'node',
    cb
  );
});
gulp.task('update-css', ['build-css'], browserSyncReload);
gulp.task('update-images', ['build-images'], browserSyncReload);
gulp.task('update-bower-components', ['build-bower-components'], browserSyncReload);
gulp.task('update-js', ['build-js'], browserSyncReload);
gulp.task('update-elements', ['build-elements'], browserSyncReload);

gulp.task('watch', function(cb) {
  gulp.watch(['server/**/*'], ['update-server']);
  gulp.watch(['css/**/*'], ['update-css']);
  gulp.watch(['images/**/*'], ['update-images']);
  gulp.watch(['bower_components/**/*'], ['update-bower-components']);
  gulp.watch(['js/**/*'], ['update-js']);
  gulp.watch(['elements/**/*'], ['update-elements']);
  cb();
});

gulp.task('node', function(cb) {
  if (node_process) node_process.kill();
  node_process = spawn('node', ['built/server.js'], {stdio: 'inherit'});
  node_process.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  // The callback will fire before node is ready
  // Node doesn't have a way to tell us when the app is completely running
  cb();
})

gulp.task('dev',['build'], function(cb) {
  runSequence(
    'node',
    'browser-sync',
    'watch',
    cb
  );
});

gulp.task('default',['build'], function(cb) {
  cb();
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node_process) node_process.kill()
})
