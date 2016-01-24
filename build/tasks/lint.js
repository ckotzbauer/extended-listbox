var gulp = require('gulp');
var paths = require('../paths');
var tslint = require('gulp-tslint');
var lesshint = require('gulp-lesshint');
var runSequence = require("run-sequence");

gulp.task("lint", function () {
    return runSequence(["lint-ts", "lint-less"]);
});

gulp.task('lint-ts', function() {
    return gulp.src(paths.source)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            summarizeFailureOutput: true
        }));
});

gulp.task('lint-less', function() {
    return gulp.src(paths.style)
        .pipe(lesshint())
        .pipe(lesshint.reporter());
});