var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var less = require('gulp-less');

gulp.task('build-js', function () {
    return gulp.src(paths.source)
        .pipe(gulp.dest(paths.output + 'js'));
});

gulp.task('build-less', function () {
    return gulp.src(paths.style)
        .pipe(less())
        .pipe(gulp.dest(paths.output + 'css'));
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        'build-js',
        'build-less',
        callback
    );
});