var fs = require('fs');

var appRoot = 'src/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    root: appRoot,
    source: appRoot + 'ts/**/*.ts',
    style: appRoot + 'less/extended-listbox.less',
    output: 'dist/',
    doc: 'doc/',
    packageName: pkg.name
};