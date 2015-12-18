var gulp = require('gulp');
var runSequence = require('run-sequence');
var bump = require('gulp-bump');
var args = require('../args');

gulp.task('bump-version', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump({ version: args.version }))//1.2.3
        .pipe(gulp.dest('./'));
});

gulp.task('prepare-release', function(callback) {
    return runSequence(
        'build',
        'bump-version',
        callback
    );
});