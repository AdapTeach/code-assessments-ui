angular.module('assessment')
    .controller('GuidesCtrl',function(atGuide,$mdToast){

        this.update = function(guide){
            atGuide.save(guide._id,guide).then(function(){
                $mdToast.show({
                    template : '<md-toast>guide updated</md-toast>'
                })
            });
        };

        this.remove = function(id){
            atGuide.destroy(id).then(function(){
                $mdToast.show({
                    template : '<md-toast>guide removed</md-toast>'
                })
            })
        };

        this.move = function(from,to){
            //todo change this !!!
            var options = {
                new : to,
                index : from,
                type : 'guide'
            };
            $atAssessment.moveChildren(options);
        };
    })
    .controller('TipsCtrl',function(atAssessment,$mdToast,$stateParams){
        this.update = function($index,tip){
            var myTip = {
                text : tip
            };
            atAssessment.get($stateParams.id).addTip($index,myTip).then(function(){
                $mdToast.show({
                    template : '<md-toast>tip updated</md-toast>'
                })
            })
        };

        this.remove = function($index){
            atAssessment.get($stateParams.id).removeTip($index).then(function(){
                $mdToast.show({
                    template : '<md-toast>tip updated</md-toast>'
                })
            })
        };

        this.move = function(from,to){
            atAssessment.get($stateParams.id).moveTip();
        };
    })
    .controller('TestsCtrl',function($atAssessment,$mdDialog){
        this.edit = function($index,$event,test){
            $mdDialog.show({
                templateUrl : 'assessment/templates/dialog/test.tpl.html',
                //targetEvent: $event,
                locals : {
                    index : $index,
                    test : testId
                },
                controller : 'TestDialogCtrl as test'
            }).then(function(newTest){
                test = newTest;
            })
        };

    });