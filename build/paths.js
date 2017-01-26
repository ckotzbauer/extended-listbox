var fs = require('fs');
var path = require('path');

var appRoot = 'src/';

module.exports = {
    source: appRoot + 'ts/**/*.ts',
    style: appRoot + 'less/extended-listbox.less',
    output: 'build/out/'
};