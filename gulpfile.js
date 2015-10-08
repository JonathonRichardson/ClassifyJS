var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'),
    replace      = require('gulp-replace'),
    pkg          = require('./package.json'),
    del          = require('del');


gulp.task('clean', function(cb) {
  del(['dist']);
  cb();
});

gulp.task('js', ['clean'], function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('classify.js'))

    //Update the version number from the source file
    .pipe(replace('{{VERSION}}',pkg.version)) 

    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default', ['js']);