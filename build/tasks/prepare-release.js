var gulp = require('gulp');
var runSequence = require('run-sequence');
var fs = require('fs');
var bump = require('gulp-bump');
var args = require('../args');

gulp.task('bump-version', function() {
    return gulp.src(['./package.json', './bower.json', './extended-listbox.jquery.json'])
        .pipe(bump({ type:args.bump })) //major|minor|patch
        .pipe(gulp.dest('./'));
});

gulp.task('prepare-release', function(callback) {
    return runSequence(
        'build',
        'bump-version',
        callback
    );
});