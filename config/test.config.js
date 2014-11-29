'use strict';

var baseDir = 'src';
//this is the port the application is running on
var port =  3000;

module.exports = {
  //Protractor
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    baseDir + '/test/e2e/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },
  seleniumArgs: ['-browserTimeout=60'],
  baseUrl: 'http://127.0.0.1:'+port,
  //Karma
  //This is the list of file patterns to load into the browser during testing.
  files: [
    baseDir + '/src/vendor/angular/angular.js',
    baseDir + '/src/vendor/angular-mocks/angular-mocks.js',
    baseDir + '/src/vendor/angular-ui-router/release/angular-ui-router.js',
    baseDir + '/src/build/*.js',
    baseDir + '/test/unit/**/*.spec.js'
  ],

  //used framework
  frameworks: ['jasmine'],

  plugins: [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-coverage',
    'karma-html-reporter',
    'karma-mocha-reporter'
  ],

  preprocessors: {
    '**/client/src/**/*.js': 'coverage'
  },

  reporters: ['mocha', 'html', 'coverage'],

  coverageReporter: {
    type: 'html',
    dir: baseDir + '/test/unit-results/coverage',
    file: 'coverage.html'
  },

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },

  logLevel: 'info',

  urlRoot: '/__test/',

  //used browsers (overriddeng in some gulp task)
  browsers: ['Chrome']

};
