
module.exports = {
    basePath: '.',
    frameworks: ['qunit'],
    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/requirejs/require.js',
        {pattern: 'build/out/test/src/ts/*.js', included: false},
        {pattern: 'build/out/test/test/**/*Test.js', included: true},
        {pattern: 'build/out/test/test/infrastructure/**/*.js', included: true},
        'build/out/js/extended-listbox.js',
        'test/**/TestMain.js'
    ],
    reporters: ['dots', 'coverage'],
    preprocessors: {
        'build/out/js/extended-listbox.js': ['coverage']
    },
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    browsers: ['PhantomJS'],
    coverageReporter: {
        dir: "build/",
        reporters: [
            { type: 'lcov', subdir: 'coverage' }
        ]
    }
};
