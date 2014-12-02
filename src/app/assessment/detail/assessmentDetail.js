'use strict';

/**
 * @name  config
 * @description config block
 */
function assessmentConfig($stateProvider) {
    $stateProvider
        .state('assessment.detail', {
            url: '/:id',
            abstract: true,
            resolve: {
                assessment : function(Restangular,$stateParams){
                    if($stateParams.id) {
                        return Restangular.one('assessment', $stateParams.id).get();
                    }else{
                        return {};
                    }
                }
            },
            views: {
                assess: {
                    templateUrl: 'app/assessment/detail/assessment.tpl.html',
                    controller: 'AssessmentCtrl as assessment'
                }
            }
        });
}


/**
 * @name  Assessment
 * @description Controller
 */
function AssessmentCtrl($stateParams, Restangular, $mdToast,$mdBottomSheet, $state, assessment, assessmentsList) {
    var self = this;

    assessmentsList.current = assessment;

    this.data = assessment;

    this.exist = !!$stateParams.id;

    this.bottom = function(){
        $mdBottomSheet.show({
            templateUrl: 'app/assessment/detail/bottom.tpl.html',
            controller: 'AssessmentBottomCtrl',
            controllerAs: 'assessment',
            locals: {
                assessment: assessment
            }
        }).then(function(response){
            if(response.type == 'update'){
                $mdToast.show({
                    template: '<md-toast>Assessment updated !</md-toast>'
                });
            }else if(response.type == 'suppression'){
                $mdToast.show({
                    template: '<md-toast>Assessment removed !</md-toast>'
                });
            }
        })
    };


    this.save = function () {
        Restangular.all('assessment')
            .post(self.data)
            .then(function (createdAssessment) {
                assessmentsList.data.push(createdAssessment);
                $mdToast.show({
                    template: '<md-toast>Assessment created !</md-toast>'
                });
                $state.go('assessment.detail.base', {id: assessment._id});
            });
    };
}

/**
 * @name  AssessmentBottomCtrl
 * @description Controller of the bottomsheet of an assessment page
 */
function AssessmentBottomCtrl($mdBottomSheet, assessment){
    this.save = function() {
        assessment
            .put()
            .then(function (updatedAssessment) {
                var response = {
                    type: 'update',
                    data: updatedAssessment
                };
                $mdBottomSheet.hide(response);
            });
    };

    this.remove = function(){
        assessment
            .remove()
            .then(function () {
                var response = {
                    type: 'suppression'
                };
                $mdBottomSheet.hide(response);
                $state.go('assessment.detail.base',{id : ''});
            });
    };

    this.share = function(){
        alert('ther is nothing here :(');
    };
}

angular.module('assessment.detail', [
    'assessment.detail.base',
    'assessment.detail.guides',
    'assessment.detail.tips',
    'assessment.detail.tests',
    'assessment.detail.compilation'
])
    .config(assessmentConfig)
    .controller('AssessmentCtrl', AssessmentCtrl)
    .controller('AssessmentBottomCtrl', AssessmentBottomCtrl);
