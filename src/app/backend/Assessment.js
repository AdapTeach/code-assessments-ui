angular.module('backend', [])
//    .constant('BACKEND_URL', 'http://localhost:5010/')

    .factory('$atAssessment', function (BACKEND_URL, $http, $q) {

        var service = {},
            URI = '/assessment/';

        service.fetchAll = function(){
            var deferred = $q.defer();
            $http.get(BACKEND_URL + URI ).success(function(data){
                deferred.resolve(data);
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.fetchOne = function(assessmentId){
            var deferred = $q.defer();
            $http.get(BACKEND_URL + URI + assessmentId).success(function(data){
                deferred.resolve(data);
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.create = function (assess) {
            var deferred = $q.defer();
            $http.post(BACKEND_URL + URI, assess).success(function(data){
                deferred.resolve(data);
            }).error(function(err){
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.update= function(assessmentId,assess){
            var deferred = $q.defer();
            $http.put(BACKEND_URL + URI + assessmentId, assess).success(function(data){
                deferred.resolve();
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.remove = function(assessmentId){
            var deferred = $q.defer();
            $http.delete(BACKEND_URL + URI + assessmentId).success(function(data){
                service.assessment = data;
                deferred.resolve();
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        return service;
    });