// Karma configuration
// Generated on Fri Jan 01 2016 13:20:47 GMT+0100 (Mitteleuropäische Zeit)

module.exports = function(config) {

    // Browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/OS combos
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'chrome',
            customData: {
                awesome: true
            }
        },
        'SL_Firefox': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'firefox'
        },
        'SL_Edge': {
            base: 'SauceLabs',
            platform: 'Windows 10',
            browserName: 'microsoftedge'
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

