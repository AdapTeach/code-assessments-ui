angular.module('assessment')
    .controller('GuidesCtrl',function($atAssessment,$mdToast){

        this.save = function(guide){
            $atAssessment.updateGuide(guide).then(function(){
                $mdToast.show({
                    template : '<md-toast>guide updated</md-toast>'
                })
            });
        };

        this.remove = function($index,guide){
            $atAssessment.removeGuide($index,guide).then(function(){
                $mdToast.show({
                    template : '<md-toast>guide removed</md-toast>'
                })
            });
        };

        this.move = function(from,to){
            var options = {
                new : to,
                index : from,
                type : 'guide'
            };
            $atAssessment.moveChildren(options).then(function(){

            })
        };
    })
    .controller('TipsCtrl',function($atAssessment){
        this.save = function(tip){

        };

        this.remove = function(index,tip){
            $atAssessment.removeTip(index,tip);
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