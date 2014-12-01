'use strict';

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});

/**
 * @name  BACKEND
 * @description Constant url of the webservice
 */
var BACKEND = {
    URL: 'http://localhost:5011'
};

/**
 * @name  config
 * @description configuration function
 */
function config($urlRouterProvider, $httpProvider, $locationProvider, RestangularProvider, BACKEND, personaProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('httpInterceptor');
    RestangularProvider.setBaseUrl(BACKEND.URL);
    personaProvider.config({
        baseUrl: BACKEND.URL,
        tokenName: 'code-assess-token'
    });
}

/**
 * @name  run
 * @description run function
 */
function run($log) {
    $log.debug('App is running!');
}

angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'ui.route',
    'restangular',
    'angular-persona-jwt',
    'home',
    'assessment',
    'common'
])
    .constant('BACKEND', BACKEND)
    .config(config)
    .run(run);
