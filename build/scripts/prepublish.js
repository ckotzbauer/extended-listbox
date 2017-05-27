const globby = require("globby");
const fs = require("fs");
const path = require("path");

const cssFiles = globby.sync("build/out/js/*.css*");
const jsFiles = globby.sync("build/out/js/*.js*");

for (let css of cssFiles) {
    fs.createReadStream(css).pipe(fs.createWriteStream("dist/css/" + path.basename(css)));
}

for (let js of jsFiles) {
    fs.createReadStream(js).pipe(fs.createWriteStream("dist/js/" + path.basename(js)));
}

const sassFile = "src/styles/extended-listbox.scss"
fs.createReadStream(sassFile).pipe(fs.createWriteStream("dist/css/" + path.basename(sassFile)));
