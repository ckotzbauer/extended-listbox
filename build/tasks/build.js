var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('build-js', function () {
    return gulp.src(paths.source)
        .pipe(gulp.dest(paths.output + 'js'));
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        'build-js',
        callback
    );
});