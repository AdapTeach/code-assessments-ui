angular.module('assessment')
    .controller('GuidesCtrl',function($atAssessment,$mdToast){

        this.update = function(guide){
            $atAssessment.updateGuide(guide).then(function(){
                $mdToast.show({
                    template : '<md-toast>guide updated</md-toast>'
                })
            });
        };

        this.remove = $atAssessment.removeGuide;

        this.move = function(from,to){
            var options = {
                new : to,
                index : from,
                type : 'guide'
            };
            $atAssessment.moveChildren(options);
        };
    })
    .controller('TipsCtrl',function($atAssessment,$mdToast){
        this.update = function($index,tip){
            var myTip = {
                text : tip
            };
            $atAssessment.updateTip($index,myTip).then(function(){
                $mdToast.show({
                    template : '<md-toast>tip updated</md-toast>'
                })
            })
        };

        this.remove = $atAssessment.removeTip;

        this.move = function(from,to){
            var options = {
                new : to,
                index : from,
                type : 'tip'
            };
            $atAssessment.moveChildren(options);
        };
    })
    .controller('TestsCtrl',function($atAssessment,$mdDialog){
        this.edit = function($index,$event,test){
            $mdDialog.show({
                templateUrl : 'assessment/templates/dialog/test.tpl.html',
                //targetEvent: $event,
                locals : {
                    index : $index,
                    test : test
                },
                controller : 'TestDialogCtrl as test'
            }).then(function(newTest){
                test = newTest;
            })
        };

    });