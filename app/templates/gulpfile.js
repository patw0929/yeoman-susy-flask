'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  changed = require('gulp-changed'),
  scsslint = require('gulp-scss-lint'),
  imagemin = require('gulp-imagemin'),
  svg2png = require('gulp-svg2png'),
  svgmin = require('gulp-svgmin'),
  optipng = require('imagemin-optipng'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  notify = require('gulp-notify'),
  jshint = require('gulp-jshint'),
  webpack = require('webpack'),
  gWebpack = require('webpack-stream'),
  glob = require('glob'),
  path = require('path');


// --------------------
// CSS Stylesheets
// --------------------
gulp.task('styles', function() {
  return gulp.src('./assets/scss/*.scss')
  .pipe(sass({
    includePaths: ['./bower_components'],
    errLogToConsole: true,
    outputStyle: 'compressed'
  }))
  .pipe(minifyCSS({
    relativeTo: './bower_components',
    processImport: true
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./static/css'))
  .pipe(notify('Done: <%= file.relative %>'));
});


// --------------------
// SCSS Lint
// --------------------
gulp.task('scsslint', function() {
  return gulp.src('assets/scss/**/*.scss')
  .pipe(scsslint({
    config: '../.scss-lint.yml',
    maxBuffer: 30000000
  }));
});


// --------------------
// SVG
// --------------------
gulp.task('svg', function() {
  return gulp.src('assets/svg/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('assets/images'))
  .pipe(svg2png())
  .pipe(gulp.dest('static/images'))
  .pipe(notify({
    message: '<%= file.relative %> complete'
  }));
});


// --------------------
// Images
// --------------------
gulp.task('images', ['svg'], function() {
  var imgDst;
  imgDst = './static/images';
  return gulp.src(['assets/images/**/*',
                   '!assets/images/favicon.ico'])
  .pipe(changed(imgDst))
  .pipe(imagemin({
    progressive: true,
    optimizationLevel: 4,
    use: [optipng()]
  }))
  .pipe(gulp.dest(imgDst))
  .pipe(notify({
    message: 'Images task completed.'
  }));
});


// --------------------
// Images
// --------------------
gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('static/fonts'))
  .pipe(notify({
    message: 'Fonts task completed.'
  }));
});


// --------------------
// Images
// --------------------
gulp.task('js', function() {
  var appRoot, bowerRoot, entries, nodeRoot, result;

  appRoot = path.join(__dirname, 'assets/js');
  bowerRoot = path.join(__dirname, 'bower_components');
  nodeRoot = path.join(__dirname, 'node_modules');
  result = {};

  glob.sync('assets/js/*.js').forEach(function(value) {
    var filename, key;
    key = value.replace('.js', '').replace('assets/js/', '');
    filename = value.replace('assets/js/', '');
    result[key] = filename;
  });

  entries = result;

  return gulp.src('assets/js/*.js')
    .pipe(gWebpack({
      context: __dirname + '/assets/js',
      entry: entries,
      output: {
        path: __dirname + '/static/js',
        publicPath: '/static/js/',
        filename: '[name].min.js',
        chunkFilename: 'chunks/[id].chunk.js'
      },
      externals: {
        jquery: 'jQuery',
        root: [path.join(__dirname, 'bower_components')]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }), new webpack.optimize.OccurenceOrderPlugin()
      ],
      resolve: {
        root: [appRoot, nodeRoot, bowerRoot],
        extensions: ['', '.js', '.jsx'],
        alias: {
        }
      },
      resolveLoader: {
        root: bowerRoot
      },
      module: {
        loaders: [
          {
            test: /\.json$/,
            loader: 'json'
          }, {
            test: /\.jsx$/,
            loader: 'jsx'
          }
        ]
      }
    }))
    .pipe(gulp.dest('static/js'));
});


// ------------------------
// Javascript (standalone)
// ------------------------
gulp.task('js:standalone', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js',
                   'asse ts/js/lib/**/*.js'])
   .pipe(uglify())
   .pipe(gulp.dest('static/js/vendor'))
   .pipe(notify('Done: <%= file.relative %>'));
});


// --------------------
// JSHint
// --------------------
gulp.task('jshint', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint('../.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});


// --------------------
// Default
// --------------------
gulp.task('default', ['images', 'styles', 'js']);


// --------------------
// Watch
// --------------------
gulp.task('watch', function() {
  var server;
  gulp.watch('assets/**/*.scss', ['styles']);
  gulp.watch('assets/**/*.coffee', ['js']);
  gulp.watch('assets/images/**/*', ['images']);
  server = livereload();
  return gulp.watch(['static/**']).on('change', function(file) {
    return server.changed(file.path);
  });
});
