'use strict';

/**
 * @name  assessmentConfig
 * @description config of the state assessment.edit
 */
function assessmentConfig($stateProvider) {
    $stateProvider
        .state('assessment.edit', {
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
                    templateUrl: 'assessment/edit/assessment.edit.tpl.html',
                    controller: 'AssessmentCtrl as assessment'
                }
            }
        });
}


/**
 * @name  AssessmentCtrl
 * @description Controller
 */
function AssessmentCtrl($stateParams, Restangular, $mdToast,$mdBottomSheet, $state, assessment, assessmentsList) {
    var self = this;

    assessmentsList.current = assessment;

    this.data = assessment;

    this.exist = !!$stateParams.id;

    this.bottom = function(){
        $mdBottomSheet.show({
            templateUrl: 'assessment/edit/bottom.tpl.html',
            controller: 'AssessmentBottomCtrl',
            controllerAs: 'assessment',
            locals: {
                assessment: assessment
            }
        }).then(function(response){
            if(response.type === 'update'){
                $mdToast.show({
                    template: '<md-toast>Assessment updated !</md-toast>'
                });
            }else if(response.type === 'suppression'){
                $mdToast.show({
                    template: '<md-toast>Assessment removed !</md-toast>'
                });
            }
        });
    };


    this.save = function () {
        Restangular.all('assessment')
            .post(self.data)
            .then(function (createdAssessment) {
                assessmentsList.data.push(createdAssessment);
                $mdToast.show({
                    template: '<md-toast>Assessment created !</md-toast>'
                });
                $state.go('assessment.edit.compilationunits', {id: createdAssessment._id});
            });
    };
}

/**
 * @name  AssessmentBottomCtrl
 * @description Controller of the bottomsheet of an assessment page
 */
function AssessmentBottomCtrl($mdBottomSheet, assessment, $state, $window){
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
                $state.go('assessment.edit.compilationunits',{id : ''});
            });
    };

    this.share = function(){
        $window.alert('there is nothing here \'-_-');
    };
}

angular.module('assessment.edit', [
    'textAngular',
    'assessment.edit.guides',
    'assessment.edit.tips',
    'assessment.edit.tests',
    'assessment.edit.compilation'
])
    .config(assessmentConfig)
    .controller('AssessmentCtrl', AssessmentCtrl)
    .controller('AssessmentBottomCtrl', AssessmentBottomCtrl);
