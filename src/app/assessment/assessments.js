'use strict';

/**
 * @name  assessmentsConfig
 * @description config of state assessment
 */
function assessmentsConfig($stateProvider) {
    $stateProvider.state('assessment', {
        url: '/assessment/:id',
        abstract: true,
        resolve: {
            assessment: function (Restangular, $stateParams, $state) {
                if ($stateParams.id) {
                    if($stateParams.id === 'new'){
                        return {};
                    }else{
                        return Restangular.one('assessment', $stateParams.id).get();
                    }
                } else {
                    $state.go('home');
                }
            },
            list: function (Restangular) {
                return Restangular.all('assessment').getList();
            }
        },
        views: {
            main: {
                templateUrl: 'assessment/assessments.tpl.html',
                controller: 'AssessmentsListCtrl as app'
            }
        }
    });
}

/**
 * @name  ACE
 * @description Constant ui-ace configuration
 */
var ACE = {
    java: {
        mode: 'java',
        theme: 'eclipse',
        require: ['ace/ext/language_tools'],
        advanced: {
            enableSnippets: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        }
    }
};

/**
 * @name  assessmentsList
 * @description collection of assessments
 */
function assessmentsList() {
    return {
        data: []
    };
}


/**
 * @name  AssessmentsCtrl
 * @description Controller
 */
function AssessmentsCtrl(ACE, list, assessment, assessmentsList, Submissions) {
    var self = this;
    assessmentsList.data = list;
    self.list = assessmentsList.data;
    this.AceConfig = ACE;
    this.assessment = assessment;
    this.Submissions = Submissions;
}

angular.module('assessment', [
    'assessment.edit',
    'assessment.train',
    'submission'
])
    .constant('ACE', ACE)
    .config(assessmentsConfig)
    .controller('AssessmentsListCtrl', AssessmentsCtrl)
    .factory('assessmentsList', assessmentsList);
