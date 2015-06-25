var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');


// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'],function(done) {
  var commerce = url.parse('http://uat-commerce.mesh.mx');
  commerce.route = '/api';
  var social = url.parse('http://dev-social.mesh.mx');
  social.route = '/social';

  browserSync({
    open: true,
    port: 9000,
//     browser: "google-chrome",
    server: {
      baseDir: ['./app'],
      middleware: [proxy(commerce), proxy(social)]
    }
  }, done);
});
