'use strict';

/**
 * @name  httpInterceptor
 * @description middleware for $http
 */
function httpInterceptor($q, $log) {
    return {
        request: function (config) {
            return config;
        },
        requestError: function (rejection) {
            $log.debug(rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            //$log.debug('response: ', response);
            return response;
        },
        responseError: function (rejection) {
            $log.debug(rejection);
            return $q.reject(rejection);
        }
    };
}

angular.module('common.interceptors', [])
    .factory('httpInterceptor', httpInterceptor);
