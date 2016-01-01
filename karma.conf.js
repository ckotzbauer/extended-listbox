// Karma configuration
// Generated on Fri Jan 01 2016 13:20:47 GMT+0100 (Mitteleuropäische Zeit)

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['qunit'],
    exclude: [
        "node_modules",
        "bower_components"
    ],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/requirejs/require.js',
      {pattern: 'src/ts/**/*.ts', included: false},
      {pattern: 'test/**/*Test.ts', included: false},
      'dist/js/extended-listbox.js',

      '**/test/infrastructure/*.js',
      '**/test/*Test.js',
      '**/test/TestMain.js'
    ],
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/js/extended-listbox.js': ['coverage']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    singleRun: true,
    browsers: ['PhantomJS'],
    coverageReporter: {
      type: 'lcovonly',
      dir: "build/"
    }
  });
};
