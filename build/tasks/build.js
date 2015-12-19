var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var args = require('../args');
var less = require('gulp-less');
var replace = require('gulp-replace');
var sourceMaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var compilerOptions = require('../tsc-options');
var insert = require('gulp-insert');
var fs = require('fs');

gulp.task('build-js', function () {
    var fileComment = fs.readFileSync("build/libheader.js", "utf8") + "\n\n";

    return gulp.src(paths.source)
        .pipe(sourceMaps.init())
        .pipe(ts(compilerOptions))
        .pipe(insert.prepend(fileComment))
        .pipe(replace('[VERSION]', args.version))
        .pipe(replace('[YEAR]', args.year))
        .pipe(replace('[LICENSE]', args.license))
        .pipe(sourceMaps.write('.'))
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