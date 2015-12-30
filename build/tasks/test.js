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

    fs.writeFileSync("test/TestMain.js", template);
}

function generateTestMain() {
    var files = [];

    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {
        files.push(file.path.substr(file.path.lastIndexOf("\\") + 1));

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

gulp.task('prepare-tests', function () {
    return runSequence('clean-tests', 'build-tests', 'generate-testmain');
});
