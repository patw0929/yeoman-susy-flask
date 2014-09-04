var gulp = require('gulp'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    notify = require('gulp-notify');


gulp.task('styles', function () {
  gulp.src('assets/scss/*.scss')
    .pipe(compass({
        style: 'compressed',
        comments: false,
        css: 'static/css',
        sass: 'assets/scss',
        image: 'static/images',
        font: 'static/fonts',
        import_path: [
          'bower_components/susy/sass',
          'bower_components/breakpoint-sass/stylesheets'
        ]
    }))
    .pipe(gulp.dest('static/css'))
    .pipe(notify("Done: <%= file.relative %>"));
});


gulp.task('default', ['styles']);
