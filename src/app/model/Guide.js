angular.module('backend')
    .factory('atGuide', function (BACKEND, DS){
        var Guide =  DS.defineResource({
            name: 'guide',
            idAttribute: '_id',
            endpoint: 'guide',
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
        return Guide;
    });
