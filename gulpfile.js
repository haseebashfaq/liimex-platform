// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $             = require('gulp-load-plugins')();
var argv          = require('yargs').argv;
var gulp          = require('gulp');
var rimraf        = require('rimraf');
var router        = require('front-router');
var sequence      = require('run-sequence');
var modRewrite    = require('connect-modrewrite');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var spawn         = require('child_process').spawn;
var polyfill      = require("babel-polyfill");
var babel         = require('gulp-babel');
var node;

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/templates/**/**/*.*',
    '!./client/assets/{scss,js}/**/*.*',
    '!./client/assets/{scss,js}/**/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'client/assets/scss',
    'vendor/foundation-apps/scss',
    'bower_components/font-awesome/scss',
    'bower_components/material-foundation/scss',
    'bower_components/materialize/sass'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    './node_modules/es5-shim/es5-shim.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.min.js',
    'bower_components/hammerjs/hammer.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-resource/angular-resource.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'vendor/foundation-apps/js/vendor/**/*.js',
    'vendor/foundation-apps/js/angular/**/*.js',
    '!vendor/foundation-apps/js/angular/app.js',
    'bower_components/firebase/firebase.js',
    'bower_components/angularfire/dist/angularfire.min.js',
    'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
    'bower_components/dropzone/dropzone.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js',
    'bower_components/angular-dynamic-number/release/dynamic-number.min.js',
    'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
    'bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js',
    'bower_components/ng-file-upload/ng-file-upload.min.js',
    'bower_components/angular.uuid2/dist/angular-uuid2.min.js',
    'vendor/fuse.js/src/fuse.js',
    'bower_components/mark.js/dist/mark.min.js',
    'bower_components/mark.js/dist/jquery.mark.min.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/combodate/src/combodate.js'
  ],
  // These files are for your app's JavaScript
  appJS: [
    './node_modules/babel-polyfill/dist/polyfill.js',
    'client/assets/js/app.js',
    'client/assets/js/controllers/*.js',
    'client/assets/js/controllers/**/*.js',
    'client/assets/js/constants/*.js',
    'client/assets/js/directives/*.js',
    'client/assets/js/filters/*.js',
    'client/assets/js/components/**/*.js',
    'client/assets/js/models/*.js'
  ],
  // path for polyfill in node js
  polyfill: './node_modules/babel-polyfill/dist/polyfill.js',
  es5shim : './node_modules/es5-shim/es5-shim.js'
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src('./client/templates/**/*.html')
    .pipe(router({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./build/templates'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('vendor/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./build/assets/js'))
  ;

  // Iconic SVG icons
  gulp.src('./vendor/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./build/assets/img/iconic/'))
  ;

  cb();
});

// Compiles Sass
gulp.task('sass', function () {
  var minifyCss = $.if(isProduction, $.minifyCss());

  return gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(minifyCss)
    .pipe(gulp.dest('./build/assets/css/'))
  ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation', 'uglify:app'])

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('uglify:app', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(babel({presets: ['es2015'], compact:false}))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

// Starts a test server, which you can view at http://localhost:8079
gulp.task('server', ['build'], function() {
  // gulp.src('./build')
  //   .pipe($.webserver({
  //     port: 8079,
  //     host: 'localhost',
  //     fallback: 'index.html',
  //     livereload: true,
  //     open: true
  //   }))
  // ;
  // browserSync({
  //   open: false,
  //   notify: false,
  //   server: {
  //     baseDir: './build',
  //     middleware: [
  //       modRewrite(['^[^\\.]*$ /index.html [L]'])
  //     ]
  //   }
  // });
  if (node) node.kill()
  node = spawn('node', ['server/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'copy:foundation', 'sass', 'uglify'], 'copy:templates', cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass', reload]);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app', reload]);
  gulp.watch(['./client/assets/js/**/*.*'], ['uglify:app', reload]);
  gulp.watch(['./client/assets/js/**/**/*.*'], ['uglify:app', reload]);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy', reload]);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['copy:templates', reload]);

  // Watch Server Files
  gulp.watch(['./server/*'], ['server',reload]);
  gulp.watch(['./server/**/*.*'], ['server',reload]);

});
