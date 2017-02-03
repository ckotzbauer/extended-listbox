var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var fs = require('fs');
var yargs = require('yargs');

var libraryName = 'extended-listbox';
var plugins = [];
var outputFile;

if (yargs.argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    plugins.push(new ExtractTextPlugin(libraryName + "-min.css", { allChunks: true }));
    outputFile = libraryName + '-min.js';
} else {
    plugins.push(new ExtractTextPlugin(libraryName + ".css", { allChunks: true }));
    outputFile = libraryName + '.js';
}

var banner = fs.readFileSync('build/libheader.txt', 'utf8');
var pkg = require("./package.json");
banner = banner.replace("[VERSION]", pkg.version);
banner = banner.replace("[DATE]", new Date().toISOString());
banner = banner.replace("[LICENSE]", pkg.license);
banner = banner.replace("[YEAR]", new Date().getFullYear());
plugins.push(new webpack.BannerPlugin(banner));

var config = {
    entry: [
        __dirname + '/src/ts/BaseListBox.ts'
    ],
    devtool: null,
    output: {
        path: path.join(__dirname, '/build/out/js/'),
        filename: outputFile,
        library: "extendedlistbox",
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ },
            { test: /\.less/, loader: ExtractTextPlugin.extract("css-loader!less-loader") }
        ]
    },
    resolve: {
        root: path.resolve('./src/ts'),
        extensions: ['', '.ts', '.less']
    },
    plugins: plugins
};

module.exports = config;