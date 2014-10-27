angular.module('assessment')
    .controller('TipCtrl',function($atAssessment,$mdBottomSheet,$mdToast){
        var self = this;
        this.save = function(){
            $atAssessment.addTip(self).then(function(tip){
                $mdToast.show({
                    template: '<md-toast>Tip created</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.hide();
            }).then(function(err){
                $mdToast.show({
                    template: '<md-toast>error</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.cancel(err);
            })
        };
    })

    .controller('GuideCtrl',function($atAssessment,$mdBottomSheet,$mdToast){
        var self = this;
        this.save = function(){
            $atAssessment.addGuide(self).then(function(guide){
                $mdToast.show({
                    template: '<md-toast>Guide '+guide.title+' created</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.hide();
            }).then(function(err){
                $mdToast.show({
                    template: '<md-toast>error</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.cancel(err);
            })
        };
    })
    .controller('TestCtrl',function($atAssessment,$mdBottomSheet,$mdToast){
        var self = this;
        this.save = function(){
            $atAssessment.addTest(self).then(function(){
                $mdToast.show({
                    template: '<md-toast>Test created</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.hide();
            }).then(function(err){
                $mdToast.show({
                    template: '<md-toast>error</md-toast>',
                    hideDelay: 3000
                });
                $mdBottomSheet.cancel(err);
            })
        };
    });