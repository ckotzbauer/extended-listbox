var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var coveralls = require('coveralls');
var coverPercentage = require('coverage-percentage');
var globby = require("globby");


function printCoverage(exitCode) {
    var f = path.resolve('build/coverage/lcov.info');
    coverPercentage(f, 'lcov', function (err, coverage) {
        if (err) {
            throw err;
        } else {
            console.log("Coverage: " + coverage.toFixed(2) + " %");
            process.exit(exitCode);
        }
    });
}

function handleCoverallsError(done, err) {
    if (err){
        done(1);
        throw err;
    }
}

function sendToCoverallsCallback(done, err, response, body) {
    handleCoverallsError(done, err);
    if (response.statusCode >= 400){
        handleCoverallsError(done, 'Bad response:' + response.statusCode + ' ' + body);
    } else {
        done(0);
    }
}

function sendToCoveralls(input, done) {
    coveralls.getBaseOptions(function(err, options){
        options.filepath = '.';
        coveralls.convertLcovToCoveralls(input, options, function(err, postData){
            handleCoverallsError(done, err);
            coveralls.sendToCoveralls(postData, function(err, response, body){
                sendToCoverallsCallback(done, err, response, body);
            });
        });
    });
}


sendToCoveralls(fs.readFileSync('build/coverage/lcov.info'), function (exitCode) {
    printCoverage(exitCode);
});
