// Karma configuration
// Generated on Wed Mar 15 2017 22:07:09 GMT+0330 (Iran Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            "wwwroot/assets/vendor/vendor-bundle.min.js",
            "bower_components/angular-mocks/angular-mocks.js",
            'wwwroot/*.js',
            'wwwroot/**/*.js',
            'wwwroot/**/**/*.js',
            'wwwroot/*.spec.js',
            'wwwroot/**/*.spec.js',
        ],


        // list of files to exclude
        exclude: [
            "wwwroot/e2e-tests/*"
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'pages/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'htmlDetailed'],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-html-detailed-reporter',
            'karma-coverage'
        ],
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // Optionally, configure the reporter 
        htmlDetailed: {
            splitResults: true
        },
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: '_reports/'
        }
    });
}
