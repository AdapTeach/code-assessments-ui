'use strict';

/**
 * @name  guideConfig
 * @description Configuration of the guide list
 */

function startConfig($stateProvider){
    $stateProvider
        .state('assessment.detail.base',{
            url: '/base',
            resolve: {
                data: function(Restangular,$stateParams){
                    return Restangular
                        .one('assessment', $stateParams.id)
                        .get();
                }
            },
            views: {
                assessmentTab : {
                    templateUrl: 'app/assessment/detail/base/base.tpl.html',
                    controller: 'BaseCtrl as base'
                }
            }
        })
}

/**
 * @name  BaseCtrl
 * @description Controller of the form of assessment creation
 */
function BaseCtrl(data,Restangular,$mdToast,$mdBottomSheet,$stateParams) {
    var self = this;

    this.data = data;

    this.save = function(){
        if (self.data._id) {
            self.data
                .put()
                .then(function (updatedGuide) {
                    $mdToast.show({
                        template: '<md-toast>assessment created</md-toast>'
                    })
                });
        } else {
            Restangular
                .one('assessment',$stateParams.id)
                .post(self.data)
                .then(function (createdGuide) {
                    $mdToast.show({
                        template: '<md-toast>assessment updated !</md-toast>'
                    })
                });
        }
    };

    this.bottom = function(){
        $mdBottomSheet.show({
            templateUrl: 'app/assessment/detail/base/bottom.tpl.html',
            controller: 'AssessmentBottomCtrl',
            controllerAs: 'assessment'
        });
    };
}

/**
 * @name  AssessmentBottomCtrl
 * @description Controller of the bottomsheet of an assessment page
 */
function AssessmentBottomCtrl($mdBottomSheet){
    this.save = function() {

        $mdBottomSheet.hide();
    };

    this.remove = function(){

    };

    this.share = function(){

    };
}

angular.module('assessment.detail.base',[])
    .config(startConfig)
    .controller('BaseCtrl', BaseCtrl)
    .controller('AssessmentBottomCtrl', AssessmentBottomCtrl);