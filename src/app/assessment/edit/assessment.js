'use strict';

/**
 * @name  config
 * @description config block
 */
function assessmentConfig($stateProvider) {
    $stateProvider.state('assessment.edit', {
        url: '/:id',
        resolve: {},
        views: {
            assess: {
                templateUrl: 'app/assessment/edit/assessment.tpl.html',
                controller: 'AssessmentCtrl as assessment'
            }
        }
    });
}


/**
 * @name  Assessment
 * @description Controller
 */
function AssessmentCtrl($stateParams, Restangular, $mdToast, $state) {
    var self = this;

    this.data = Restangular.one('assessment', $stateParams.id).get().$object;

    this.exist = $stateParams.id;

    this.destroy = function () {
        self.data
            .remove()
            .then(function () {
                $mdToast.show({
                    template: '<md-toast>Assessment removed</md-toast>'
                });
                $state.go('assessment.creation');
            });
    };

    this.save = function () {
        if (self.data._id) {
            self.data
                .put()
                .then(function () {
                    $mdToast.show({
                        template: '<md-toast>Assessment updated</md-toast>'
                    });
                });
        } else {
            self.data
                .save()
                .then(function (assessment) {
                    $mdToast.show({
                        template: '<md-toast>Assessment created</md-toast>'
                    });
                    $state.go('assessment.edit', {id: assessment._id});
                });
        }
    };
}

angular.module('assessment.edit', [])
    .config(assessmentConfig)
    .controller('AssessmentCtrl', AssessmentCtrl);
