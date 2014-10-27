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
                service.data = data;
                deferred.resolve(service.data);
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

        service.delete = function(assessmentId){
            var deferred = $q.defer();
            $http.delete(BACKEND_URL + URI + assessmentId).success(function(data){
                service.assessment = data;
                deferred.resolve();
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.addGuide = function(guide){
            var deffered = $q.defer();
            $http.post(BACKEND_URL + URI + service.data._id + '/guide',guide).success(function(guide){
                service.data.guides.push(guide);
                deffered.resolve(guide)
            }).error(function(err){
                deffered.reject(err);
            });
            return deffered.promise;
        };

        service.removeGuide = function($index,guide){
            var deffered = $q.defer();
            $http.delete(BACKEND_URL + URI + service.data._id + '/guide/'+$index,guide).success(function(){
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.addTip = function(tip){
            var deffered = $q.defer();
            $http.post(BACKEND_URL + URI + service.data._id + '/tip',tip).success(function(tip){
                service.data.tips.push(tip)
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.removeTip = function($index,guide){
            var deffered = $q.defer();
            $http.delete(BACKEND_URL + URI + service.data._id + '/tip/'+guide+_id).success(function(){
                deffered.resolve()
            }).error(function(err){
                service.data.guides.splice($index,1);
                deffered.reject();
            });
            return deffered.promise;
        };

        service.addTest = function(test){
            var deffered = $q.defer();
            $http.post(BACKEND_URL + URI + service.data._id + '/test',test).success(function(test){
                service.data.tests.push(test);
                deffered.resolve()
            }).error(function(err){
                deffered.reject(err);
            });
            return deffered.promise;
        };

        service.removeTest = function($index,test){
            var deffered = $q.defer();
            $http.delete(BACKEND_URL + URI + service.data._id + '/guide/'+test._id).success(function(){
                service.data.guides.splice($index,1);
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        return service;
    });