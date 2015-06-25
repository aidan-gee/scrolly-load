var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var paths = require('../paths');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var del = require('del');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('build-production-js', function () {
  del('app.js');
  return gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-production-css', function () {
  del('styles/main.min.css');
  return gulp.src(paths.css)
    .pipe(concat('main.min.css'))
    .pipe(sass({errLogToConsole:true}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/styles/'));
});

gulp.task('build-production-html', function () {
  var target = gulp.src(paths.index);
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(paths.productionResources, {read: false, cwd:'./app/'});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app/'));
    
});

gulp.task('build-production', function(callback) {
  return runSequence(
    ['build-production-js', 'build-production-css'],
    ['build-production-html'],
    callback
  );
});
