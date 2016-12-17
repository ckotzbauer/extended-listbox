var gulp = require('gulp');
var runSequence = require('run-sequence');
var bump = require('gulp-bump');
var args = require('../args');
var paths = require('../paths');

gulp.task('bump-version', function() {
    return gulp.src(['./package.json'])
        .pipe(bump({ version: args.version }))//1.2.3
        .pipe(gulp.dest('./'));
});

gulp.task('copy-to-dist', function() {
    return gulp.src([paths.output + "js/extended-listbox*.js*", paths.output + "css/*.css"], { base: paths.output })
        .pipe(gulp.dest(paths.dist));
});

gulp.task('prepare-release', function(callback) {
    return runSequence(
        'build',
        'copy-to-dist',
        'bump-version',
        callback
    );
});