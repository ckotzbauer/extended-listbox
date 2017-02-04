var fs = require('fs');
var path = require('path');
var globby = require("globby");

var files = globby.sync("build/out/test/**/*Test.js");
var relatives = files.map(function (f) {
    return path.relative(".", f.replace(".js", "")).replace(/\\/g, "/");
});

var template = 'var tests = [FILES]; require(tests);';
var list = '"' + relatives.join('", "') + '"';
template = template.replace("FILES", list);

fs.writeFileSync("test/TestMain.js", template);
