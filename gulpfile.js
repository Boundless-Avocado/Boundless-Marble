var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy:false}),
    bower = require('main-bower-files'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    // jshint = require('gulp-jshint'),
    // rename = require('gulp-rename'),
    // uglify = require('gulp-uglify'),
    // minifyCSS = require('gulp-minify-css'),
    install = require('gulp-install'),
    inject = require('gulp-inject');


var paths = {
  appResources: ['client/**/*.js','client/**/*.css','!client/lib/**', '!client/dist/**'],
  appjs: ['client/**/*.js','!client/lib/**', '!client/dist/**'],
  appcss: ['client/**/*.css', '!client/lib/**', '!client/dist/**'],
  libjs: 'client/lib/*.js',
  libcss: 'client/lib/*.css',
  distjs: 'client/dist/*.js',
  distcss: 'client/dist/*.css',
  watch: ['client/**/*.js','client/**/*.css']
};
paths.libResources = [paths.libjs, paths.libcss];
paths.distResources = [paths.distjs, paths.distcss];

//concatenate and minify css
gulp.task('appcss', function() {
  return gulp.src(paths.appcss)
  .pipe(concat('app.css'))
  // .pipe(minifyCSS())
  .pipe(gulp.dest('./client/dist/'));
});

// concatenate and uglify scripts
gulp.task('appjs', function() {
  return gulp.src(paths.appjs)
  // .pipe(jshint('.jshintrc'))
  // .pipe(jshint.reporter('default'))
  .pipe(concat('app.js'))
  // .pipe(rename({suffix: '.min'}))
  // .pipe(uglify())
  .pipe(gulp.dest('./client/dist/'));
});

var lib = function (){
  return gulp.src(bower())
  // .pipe(concat('lib.js'))
  // .pipe(rename({suffix: '.min'}))
  // .pipe(uglify())
  .pipe(gulp.dest('./client/lib/'));
};
gulp.task('lib', function() {
  return lib();
});

gulp.task('build', ['appcss','appjs','lib']);

gulp.task('install', function() {
   return gulp.src(['./bower.json', './package.json'])
   .pipe(install());
});

gulp.task('inject-dev', function() {
  return gulp.src('./client/index.html')
    .pipe(inject(gulp.src(paths.appResources, {read: false}), {relative: true}))
    // .pipe(inject(lib(), {relative: true, name: 'lib'}))
    .pipe(gulp.dest('./client/'));
});

gulp.task('inject', function() {
  return gulp.src('./client/index.html')
    .pipe(inject(gulp.src(['./client/dist/*.js','./client/dist/*.css'], {read: false}), {relative: true}))
    .pipe(inject(lib(), {relative: true, name: 'lib'}))
    .pipe(gulp.dest('./client/'));
});

gulp.task('serve', function() {
  return nodemon({
    'watch': 'server/'
  });
});

// gulp.task('watchPkgs', function() {
//   gulp.watch(paths.pkgs, ['install']);
// });

gulp.task('watch', function() {
  $.livereload.listen();
  gulp.watch(paths.watch, function(event) {
    //TODO add linting and testing here ?
    if (event.type !== 'changed') { //if file was added or deleted...
      $.sequence('inject-dev',function() {
        $.livereload.changed(event);
      });
    } else {
      $.livereload.changed(event);
    }
  });
});

//TODO add linting and testing here
gulp.task('default', $.sequence('install', 'lib', 'inject-dev', 'serve', 'watch'));

