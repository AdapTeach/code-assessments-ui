angular.module('backend')
    .factory('atTest', function (BACKEND, DS){
        var Test =  DS.defineResource({
            name: 'test',
            idAttribute: '_id',
            endpoint: 'test',
            baseUrl: BACKEND.URL,
            //relations: {
            //    belongsTo: {
            //        assessment: {
            //            localKey: 'assessmentId',
            //            localField: 'assessment',
            //            parent: true
            //        }
            //    }
            //},
            // hook for the validate step in the model lifecycle
            validate: function (attrs, cb) {
                if (!angular.isObject(attrs)){
                    cb('Must be an object!');
                } else if (!angular.isString(attrs.title)) {
                    cb('title must be a string!');
                }
            },
            methods : {
                move : function(){

                }
            }
        });
        return Test;
    });
