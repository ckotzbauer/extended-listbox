// Karma configuration
// Generated on Fri Jan 01 2016 13:20:47 GMT+0100 (Mitteleuropäische Zeit)

var karmaBase = require("./karma.conf-base.js");

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
        }
    };

    var conf = karmaBase;
    conf.logLevel = config.LOG_WARN;
    conf.reporters.push('saucelabs');
    conf.customLaunchers = customLaunchers;
    conf.browsers = Object.keys(customLaunchers);
    conf.sauceLabs = {
        testName: 'Extended Listbox',
        recordScreenshots: false,
        connectOptions: {
            port: 5757,
            logfile: 'sauce_connect.log'
        },
        public: 'public'
    };

    config.set(conf);
};

