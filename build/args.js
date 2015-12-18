var yargs = require('yargs');
var dateFormat = require('dateformat');
var fs = require('fs');

var argv = yargs.argv;
var version = argv.version || 'build-' + dateFormat(new Date(), "isoDateTime");
var year = dateFormat(new Date(), "yyyy");
var license = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).license;

module.exports = {
    version: version,
    year: year,
    license: license
};