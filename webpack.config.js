const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

const libraryName = 'extended-listbox';
const plugins = [];
let outputFile;

if (yargs.argv.p) {
    plugins.push(new MiniCssExtractPlugin({ filename: libraryName + "-min.css", allChunks: true }));
    outputFile = libraryName + '-min.js';
} else {
    plugins.push(new MiniCssExtractPlugin({ filename: libraryName + ".css", allChunks: true }));
    outputFile = libraryName + '.js';
}

let banner = fs.readFileSync('build/libheader.txt', 'utf8');
const pkg = require("./package.json");
banner = banner.replace("[VERSION]", pkg.version);
banner = banner.replace("[DATE]", new Date().toISOString());
banner = banner.replace("[LICENSE]", pkg.license);
banner = banner.replace("[YEAR]", new Date().getFullYear());
plugins.push(new webpack.BannerPlugin(banner));

const config = {
    entry: [
        __dirname + '/src/ts/Index.ts',
        __dirname + '/src/styles/extended-listbox.scss'
    ],
    devtool: "source-map",
    output: {
        path: path.join(__dirname, '/build/out/js/'),
        filename: outputFile,
        library: "extendedlistbox",
        libraryTarget: 'var'
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
            { test: /\.scss/, loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] }
        ]
    },
    resolve: {
        //root: path.resolve('./src/ts'),
        extensions: ['.ts', '.scss']
    },
    optimization: {
        minimize: yargs.argv.p
    },
    plugins: plugins,
    mode: yargs.argv.p ? "production" : "development"
};

module.exports = config;