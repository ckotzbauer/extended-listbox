var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    root: appRoot,
    source: appRoot + 'js/**/*.js',
    style: appRoot + 'css/**/*.css',
    output: 'dist/',
    doc: 'doc/',
    packageName: pkg.name
};