angular.module('backend', [

]).constant('BACKEND', {
    //URL : 'http://codeassessments-charl.rhcloud.com/'
    URL : 'http://localhost:5011/'
}).factory('atAssessment', function (BACKEND, DS, $q){

    var Assessment =  DS.defineResource({
        name: 'assessment',
        idAttribute: '_id',
        endpoint: 'assessment',
        baseUrl: BACKEND.URL,
        //relations: {
        //    hasMany: {
        //        tip: {
        //            localField: 'tips'
        //        },
        //        test : {
        //            localField: 'tips'
        //        },
        //        guide : {
        //            localField: 'tips'
        //        }
        //    }
        //},
        // hook for the validate step in the model lifecycle

        // instance methods
        methods: {
            addTip: function () {
                return this.title + '.' + this.extension;
            },
            removeTip : function(){

            },
            moveTip : function(){

            }
        }
    });
    return Assessment;
});
