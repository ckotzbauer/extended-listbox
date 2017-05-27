const fs = require('fs');
const path = require('path');
const globby = require("globby");

const files = globby.sync("build/out/test/**/*Test.js");
const relatives = files.map((f) => {
    return path.relative(".", f.replace(".js", "")).replace(/\\/g, "/");
});

let template = 'var tests = [FILES]; require(tests);';
const list = '"' + relatives.join('", "') + '"';
template = template.replace("FILES", list);

fs.writeFileSync("test/TestMain.js", template);
