var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var args = require('../args');
var less = require('gulp-less');
var replace = require('gulp-replace');

gulp.task('build-js', function () {
    return gulp.src(paths.source)
        .pipe(replace('[VERSION]', args.version))
        .pipe(replace('[YEAR]', args.year))
        .pipe(replace('[LICENSE]', args.license))
        .pipe(gulp.dest(paths.output + 'js'));
});

gulp.task('build-less', function () {
    return gulp.src(paths.style)
        .pipe(less())
        .pipe(replace('[VERSION]', args.version))
        .pipe(replace('[YEAR]', args.year))
        .pipe(replace('[LICENSE]', args.license))
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