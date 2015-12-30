var gulp = require('gulp');
var paths = require('../paths');
var ts = require('gulp-typescript');
var compilerOptions = require('../tsc-options');
var through = require('through2');
var fs = require('fs');
var runSequence = require('run-sequence');
var open = require('gulp-open');

gulp.task('build-tests', function () {
    return gulp.src(paths.testSource + "**/*.ts")
        .pipe(ts(compilerOptions))
        .pipe(gulp.dest(paths.testOutput));
});

function writeTestMain(files) {
    var template = 'var tests = [FILES]; require(tests);';
    var list = '"' + files.join('", "') + '"';
    template = template.replace("FILES", list);
    console.log("Generated: " + template);

    fs.writeFileSync("test/TestMain.js", template);
}

function generateTestMain() {
    var files = [];

    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {
        var path = file.path.replace(/\\/g, " ").replace(/\//g, " ");
        var splitted = path.split(" ");
        files.push(splitted[splitted.length - 1]);

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    }, function () {
        writeTestMain(files);
    });

    // returning the file stream
    return stream;
}

gulp.task('generate-testmain', function () {
    return gulp.src(paths.testSource + "**/*Test.js")
        .pipe(generateTestMain());
});

gulp.task('prepare-tests', function (callback) {
    return runSequence('clean-tests', 'build-tests', 'generate-testmain', callback);
});
