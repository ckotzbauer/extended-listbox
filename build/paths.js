var fs = require('fs');
var path = require('path');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

console.log("Relative test: " + path.resolve("src/test/"));

module.exports = {
    root: appRoot,
    source: appRoot + 'ts/**/*.ts',
    style: appRoot + 'less/extended-listbox.less',
    output: 'dist/',
    packageName: pkg.name,
    testSource: "test/",
    testOutput: "test/"
};