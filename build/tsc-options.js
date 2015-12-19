module.exports = {
    typescript: require('typescript'),
    declarationFiles: false,
    noExternalResolve: false,
    target: "es5",
    module: "amd",
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    outFile: "extended-listbox.js",
    declaration: true
};