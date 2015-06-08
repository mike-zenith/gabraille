// Karma configuration
// Generated on Mon Jun 01 2015 17:59:03 GMT+0200 (Közép-európai nyári idő )

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
        "tests/**spec**.js"
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "tests/**/**spec**.js": ["browserify"]
    },

    browserify: {
        debug: false,
        transform: [
            ["babelify", {
                loose:"all",
                sourceMaps: true,
                ast: false,
                compact: false,
                comments: true,
                retainLines: true,
                optional: [ "runtime", "regenerator", "minification.deadCodeElimination", "es6.spec.templateLiterals" ]
            }]
        ],
        configure: function (bundle) {
        }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],

    customLaunchers: {
        PhantomJS_Gabraille: {
            base: 'PhantomJS',
            options: {
                windowName: 'window',
                settings: {
                    webSecurityEnabled: true
                }
            },
            flags: ['--load-images=true'],
            debug: false
        }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
