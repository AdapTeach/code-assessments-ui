'use strict';

/**
 * @name  assessmentTrainConfig
 * @description config of the state assessment.train
 */
function assessmentTrainConfig($stateProvider) {
    $stateProvider.state('assessment.train', {
        url: '/train',
        views: {
            assess: {
                controller: 'assessmentTrainCtrl',
                templateUrl: 'assessment/train/assessment.train.tpl.html'
            }
        }
    });
}


/**
 * @name  assessmentTrainConfig
 * @description config of the state assessment.train
 */
function assessmentTrainCtrl() {

}


angular.module('assessment.train', [
    'at.assessment'
])
    .config(assessmentTrainConfig)
    .controller('assessmentTrainCtrl', assessmentTrainCtrl);
