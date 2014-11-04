angular.module('backend', [])
//    .constant('BACKEND_URL', 'http://localhost:5010/')
//    .constant('BACKEND_URL', 'http://codeassessments-charl.rhcloud.com/')

    .factory('$atAssessment', function (BACKEND_URL, $http, $q) {

        var service = {},
            URI = '/assessment/';

        service.fetchAll = function(){
            var deferred = $q.defer();
            $http.get(BACKEND_URL + URI ).success(function(data){
                service.list = data;
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
                service.list.push(data);
                console.log(service.list)
                deferred.resolve(data._id);
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        service.update= function(assessment){
            var deferred = $q.defer();
            $http.put(BACKEND_URL + URI + assessment._id, assessment).success(function(assessment){
                service.data = assessment;
                deferred.resolve();
            }).error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function removeAssesment(list,asses){
            list.forEach(function(v,k){
                if(v._id == asses._id){
                    list.splice(k,1);
                }
            });
        }

        service.delete = function(assessment){
            var deferred = $q.defer();
            $http.delete(BACKEND_URL + URI + assessment._id).success(function(){
                removeAssesment(service.list,assessment);
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
            $http.delete(BACKEND_URL + URI + service.data._id + '/guide/'+guide._id).success(function(){
                service.data.guides.splice($index,1);
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.updateGuide = function(guide){
            var deffered = $q.defer();
            console.log(guide);
            $http.put(BACKEND_URL + URI + service.data._id + '/guide/'+guide._id,guide).success(function(){
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.addTip = function(tip){
            var deffered = $q.defer();
            $http.post(BACKEND_URL + URI + service.data._id + '/tip',tip).success(function(tip){
                service.data.tips.push(tip);
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.updateTip = function($index,tip){
            var deffered = $q.defer();
            $http.put(BACKEND_URL + URI + service.data._id + '/tip/'+$index,tip).success(function(){
                service.data.tips[$index] = tip.text;
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.removeTip = function($index,tip){
            var deffered = $q.defer();
            $http.delete(BACKEND_URL + URI + service.data._id + '/tip/'+$index).success(function(){
                service.data.tips.splice($index,1);
                deffered.resolve()
            }).error(function(err){
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

        service.updateTest = function(index,test){
            var deffered = $q.defer();
            $http.put(BACKEND_URL + URI + service.data._id + '/test/'+test._id,test).success(function(test){
                service.data.tests.splice(index,1,test)
                deffered.resolve()
            }).error(function(err){
                deffered.reject(err);
            });
            return deffered.promise;
        };

        service.removeTest = function($index,test){
            var deffered = $q.defer();
            $http.delete(BACKEND_URL + URI + service.data._id + '/test/'+test._id).success(function(){
                service.data.tests.splice($index,1);
                deffered.resolve()
            }).error(function(err){
                deffered.reject();
            });
            return deffered.promise;
        };

        service.moveChildren =  function(option){
            $http.put(BACKEND_URL + URI + service.data._id + '/' + option.type + '/' + option.index + '/move/' + option.new).success(function(){
                switch(option.type){
                    case 'guide':
                        service.data.guides.move(option.index,option.new);
                        break;
                    case 'tip':
                        service.data.tips.move(option.index,option.new);
                        break;
                }
            }).error(function(err){

            });
        };

        return service;
    });