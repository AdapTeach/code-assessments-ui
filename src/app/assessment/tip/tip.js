'use strict';
/**
 * @name  TipListCtrl
 * @description Controller of the tips list in the tabs
 */
function TipListCtrl(atAssessment, $mdToast, $stateParams) {
    this.update = function ($index, tip) {
        var myTip = {
            text: tip
        };
        atAssessment.get($stateParams.id).addTip($index, myTip).then(function () {
            $mdToast.show({
                template: '<md-toast>tip updated</md-toast>'
            });
        });
    };

    this.remove = function ($index) {
        atAssessment.get($stateParams.id).removeTip($index).then(function () {
            $mdToast.show({
                template: '<md-toast>tip updated</md-toast>'
            });
        });
    };

    this.move = function (from, to) {
        atAssessment.get($stateParams.id).moveTip();
    };
}

/**
 * @name  TipBottomCtrl
 * @description Controller of the bottomsheet of tips creation
 */
function TipBottomCtrl(atAssessment, $mdBottomSheet, $mdToast) {
    var self = this;
    this.save = function () {
        atAssessment.addTip(self).then(function (tip) {
            $mdToast.show({
                template: '<md-toast>Tip created</md-toast>',
                hideDelay: 3000
            });
            $mdBottomSheet.hide();
        }).then(function (err) {
            $mdToast.show({
                template: '<md-toast>error</md-toast>',
                hideDelay: 3000
            });
            $mdBottomSheet.cancel(err);
        });
    };
}

angular.module('assessment.tips',[])
    .controller('TipListCtrl', TipListCtrl)
    .controller('TipBottomCtrl', TipBottomCtrl);
