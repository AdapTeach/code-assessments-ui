angular.module('assessment')
    .controller('TestDialogCtrl',function(testId,index,atTest,$mdDialog,$mdToast){
        atTest.bindOne(this,'data',testId);
        this.update = function(){
            atTest.save(testId,this.data).then(function(test){
                $mdToast.show({
                    template : '<md-toast>test updated</md-toast>'
                });
                $mdDialog.hide(test);
            });
        };
        this.remove = function(){
            atTest.destroy(this._id).then(function(){
                $mdToast.show({
                    template : '<md-toast>test removed</md-toast>'
                });
                $mdDialog.hide();
            })
        };
    });