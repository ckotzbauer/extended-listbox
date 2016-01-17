// Karma configuration
// Generated on Fri Jan 01 2016 13:20:47 GMT+0100 (Mitteleuropäische Zeit)

module.exports = function(config) {

    // Browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/OS combos
    var customLaunchers = {
        'SL_Chrome_Latest': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'chrome'
        },
        'SL_Firefox_Latest': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'firefox'
        },
        'SL_Edge_Latest': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'microsoftedge'
        },
        'SL_IE_11': {
            base: 'SauceLabs',
            platform: 'Windows 7',
            browserName: 'internet explorer',
            version: '11'
        },
        'SL_IE_10': {
            base: 'SauceLabs',
            platform: 'Windows 7',
            browserName: 'internet explorer',
            version: '10'
        },
        'SL_IE_9': {
            base: 'SauceLabs',
            platform: 'Windows 7',
            browserName: 'internet explorer',
            version: '9'
        },
        'SL_IE_8': {
            base: 'SauceLabs',
            platform: 'Windows 7',
            browserName: 'internet explorer',
            version: '8'
        },
        SL_Safari_9: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '9'
        }
    };

    config.set({
        basePath: '.',
        frameworks: ['qunit'],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/requirejs/require.js',
            {pattern: 'src/ts/**/*.ts', included: false},
            {pattern: 'test/**/*Test.ts', included: false},
            'build/out/js/extended-listbox.js',

            'build/out/test/**/infrastructure/*.js',
            'build/out/test/**/*Test.js',
            'test/**/TestMain.js'
        ],
        reporters: ['dots', 'coverage', 'saucelabs'],
        preprocessors: {
            'build/out/js/extended-listbox.js': ['coverage']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: false,
        singleRun: true,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        coverageReporter: {
            dir: "build/",
            reporters: [
                { type: 'lcov', subdir: 'coverage' }
            ]
        },
        sauceLabs: {
            testName: 'Extended Listbox',
            recordScreenshots: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            },
            public: 'public'
        }
    });
};

