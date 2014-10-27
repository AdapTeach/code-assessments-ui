angular.module('assessment')
    .controller('GuidesCtrl',function($atAssessment){

        this.save = function($index,guide){

        };

        this.remove = function($index){
            $atAssessment.removeGuide($index)
        };

        this.up = function(index,guide){

        };

        this.down = function(index,guide){

        };
    })
    .controller('TipsCtrl',function($atAssessment){
        this.save = function(tip){

        };

        this.remove = function(tip){

        };
    })
    .controller('TestsCtrl',function($atAssessment,$mdDialog){
        this.edit = function($event,test){
            $mdDialog.show({
                templateUrl : 'assessment/templates/dialog/test.tpl.html',
                targetEvent: $event,
                locals : {
                    test : test
                },
                controller : 'TestDialogCtrl as test'
            });
        };

        this.remove = function(test){

        };
    });