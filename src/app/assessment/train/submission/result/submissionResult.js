'use strict';

angular.module('submission.result', [])

    .directive('submissionResult', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'assessment/train/submission/result/submissionResult.tpl.html',
            controller: 'SubmissionResultCtrl',
            controllerAs: 'submissionResultCtrl'
        };
    })

    .controller('SubmissionResultCtrl', function ($scope, Submissions) {
        $scope.Submissions = Submissions;
    });