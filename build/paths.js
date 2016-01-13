var fs = require('fs');
var path = require('path');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    root: appRoot,
    source: appRoot + 'ts/**/*.ts',
    style: appRoot + 'less/extended-listbox.less',
    output: 'build/out/',
    dist: "dist/",
    packageName: pkg.name,
    testSource: "test/",
    testOutput: "test/"
};