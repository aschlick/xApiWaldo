var gulp = require('gulp');
var haml = require('gulp-haml');
var bundle = require('aurelia-bundler').bundle;
var fs = require('fs');

var config = {
  force: true,
  baseURL: '.',                   // baseURL of the application
  configPath: './config.js',      // config.js file. Must be within `baseURL`
  bundles: {
    "xApi/app-build": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
      includes: [
        '[*.js]',
        '*.html!text',
        '*.css!text',
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "vendor-build": {
      includes: [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "bootstrap",
        "babel-runtime"
        "bootstrap/css/bootstrap.css!text"
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('haml', function(){
  gulp.src('./xApi/*.haml')
    .pipe(haml({ext: ''}))
    .pipe(gulp.dest('./xApi/'));
});

gulp.task('move', function(){
  fs.createReadStream('./jspm_packages/system.js').pipe(fs.createWriteStream('../../../public/javascripts/jspm_packages/system.js'));
  fs.createReadStream('./config.js').pipe(fs.createWriteStream('../../../public/javascripts/config.js'));
  fs.renameSync('./xApi/app-build.js', '../../../public/assets/xApi/app-build.js');
  fs.renameSync('./vendor-build.js', '../../../public/assets/xApi/vendor-build.js');
});

gulp.task('bundle', function() {
  bundle(config)){
});

gulp.task('default', ['haml', 'bundle', 'move']);
