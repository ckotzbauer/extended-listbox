var gulp = require('gulp');
var paths = require('../paths');
var git = require('gulp-git');
var fs = require('fs');
var args = require('../args');

function copyFiles(source, dest, callback) {
    return gulp.src(source)
        .pipe(gulp.dest(dest))
        .on('end', callback || function () {});
}

function checkout(branchName, callback) {
    return git.checkout(branchName, function (err) {
        if (err) {
            throw err
        }

        callback();
    });
}

gulp.task('publish-docs', function () {
    // Copy files to temp dir
    copyFiles(paths.latestDocs + '**/*', '_doctemp', function () {
        // Rename latest dir to new version
        fs.renameSync("_doctemp/latest", "_doctemp/" + args.version);

        // Checkout gh-pages
        checkout("gh-pages", function () {
            // Copy files from temp dir to new location
            copyFiles("_doctemp/" + args.version, 'documentation', function () {
                console.log("Another job well done!");
            });
        });
    });
});
