'use strict';

/**
 * @name  existValidator;
 * @description check if
 */
function existValidator($http,$q,BACKEND){
    return {
        restrict:'A',
        scope:{
            resource: '@'
        },
        require:'ngModel',
        link:function(scope,element,attrs,ngModel){
            ngModel.$asyncValidators.exist = function(modelValue, viewValue) {
                var deferred = $q.defer();
                $http
                    .get(BACKEND.URL+'/'+scope.resource+'/exist/'+viewValue)
                    .success(function(response) {
                        if(response){
                            deferred.reject();
                        }else{
                            deferred.resolve();
                        }
                    });
                return deferred.promise;
            };

        }

    }
}

angular.module('common.validators.async',[

])
.directive('atExist',existValidator);