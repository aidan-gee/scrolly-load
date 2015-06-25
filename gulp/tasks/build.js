var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var paths = require('../paths');
var sass = require('gulp-sass');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');


gulp.task('build-js', function () {
  del('app.js');
  return gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-css', function () {
  del('styles/main.css');
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sass({errLogToConsole:true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/styles/'));
});

gulp.task('build-html', function () {
  var target = gulp.src(paths.index);
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(paths.devResources, {read: false, cwd:'./app/'});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
    
});

gulp.task('build', function(callback) {
  return runSequence(
    ['build-js', 'build-css'],
    ['build-html'],
    callback
  );
});
