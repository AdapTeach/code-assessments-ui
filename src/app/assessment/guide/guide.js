'use strict';
/**
 * @name  GuideListCtrl
 * @description Controller of the guide list in the tabs
 */
function GuideListCtrl(atAssessment, atGuide, $mdToast, $stateParams) {
    this.update = function (guide) {
        atGuide.save(guide._id).then(function () {
            $mdToast.show({
                template: '<md-toast>guide updated</md-toast>'
            });
        });
    };

    this.remove = function (id) {
        atGuide.destroy(id).then(function () {
            $mdToast.show({
                template: '<md-toast>guide removed</md-toast>'
            });
        });
    };

    this.move = function (from, to, guideId) {
        atAssessment.get($stateParams.id).moveGuide(from, to, guideId).then(function (data) {
            console.log(data);
        });

    };
}

/**
 * @name  GuideBottomCtrl
 * @description Controller of the bottomsheet of guide creation
 */
function GuideBottomCtrl(atGuide, $mdBottomSheet, $mdToast, $stateParams, atAssessment) {
    this.create = function () {
        this.data.assessment = atAssessment.get($stateParams.id);
        atGuide.create(this.data).then(function (guide) {
            $mdToast.show({
                template: '<md-toast>Guide ' + guide.title + ' created</md-toast>',
                hideDelay: 3000
            });
            $mdBottomSheet.hide();
        });
    };
}

angular.module('assessment.guides',[])
    .controller('GuideListCtrl', GuideListCtrl)
    .controller('GuideBottomCtrl', GuideBottomCtrl);


