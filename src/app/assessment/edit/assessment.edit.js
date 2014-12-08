'use strict';

/**
 * @name  assessmentEditConfig
 * @description config of the state assessment.edit
 */
function assessmentEditConfig($stateProvider) {
    $stateProvider
        .state('assessment.edit', {
            url: '/edit',
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
function AssessmentCtrl($stateParams, Restangular, $mdToast, $mdBottomSheet, $state, assessment, assessmentsList) {
    var self = this;

    assessmentsList.current = assessment;

    this.data = assessment;

    console.log($stateParams.id !== 'new');

    this.exist = $stateParams.id !== 'new';

    this.bottom = function () {
        $mdBottomSheet.show({
            templateUrl: 'assessment/edit/bottom.tpl.html',
            controller: 'AssessmentBottomCtrl',
            controllerAs: 'assessment',
            locals: {
                assessment: assessment
            }
        }).then(function (response) {
            if (response.type === 'update') {
                $mdToast.show({
                    template: '<md-toast>Assessment updated !</md-toast>'
                });
            } else if (response.type === 'suppression') {
                $mdToast.show({
                    template: '<md-toast>Assessment removed !</md-toast>'
                });
            }
        });
    };


    this.save = function () {
        console.log(self.data);
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
function AssessmentBottomCtrl($mdBottomSheet, assessment, $state) {
    this.data = assessment;
    this.save = function () {
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

    this.remove = function () {
        assessment
            .remove()
            .then(function () {
                var response = {
                    type: 'suppression'
                };
                $mdBottomSheet.hide(response);
                $state.go('assessment.edit.compilationunits', {id: ''});
            });
    };
}

angular.module('assessment.edit', [
    'textAngular',
    'assessment.edit.guides',
    'assessment.edit.tips',
    'assessment.edit.tests',
    'assessment.edit.compilation'
])
    .config(assessmentEditConfig)
    .controller('AssessmentCtrl', AssessmentCtrl)
    .controller('AssessmentBottomCtrl', AssessmentBottomCtrl);
