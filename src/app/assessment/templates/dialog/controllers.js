angular.module('assessment')
    .controller('TestDialogCtrl',function(test,index,$atAssessment,$mdDialog,$mdToast){
        angular.extend(this,test);
        this.update = function(){
            $atAssessment.updateTest(index,this).then(function(test){
                $mdToast.show({
                    template : '<md-toast>test updated</md-toast>'
                });
                $mdDialog.hide(test);
            });
        };
        this.remove = function(){
            $atAssessment.removeTest(index,this).then(function(){
                $mdToast.show({
                    template : '<md-toast>test removed</md-toast>'
                });
                $mdDialog.hide();
            })
        };
    });