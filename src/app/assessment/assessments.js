'use strict';

/**
 * @name  assessmentsConfig
 * @description config of state assessment
 */
function assessmentsConfig($stateProvider) {
    $stateProvider.state('assessment', {
        url: '/assessment',
        resolve: {
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
        data : []
    };
}


/**
 * @name  AssessmentsCtrl
 * @description Controller
 */
function AssessmentsCtrl(ACE, list, assessmentsList) {
    var self = this;
    assessmentsList.data = list;
    self.list = assessmentsList.data;
    this.AceConfig = ACE;
}

angular.module('assessment', [
    'assessment.detail'
])
    .constant('ACE', ACE)
    .config(assessmentsConfig)
    .controller('AssessmentsListCtrl', AssessmentsCtrl)
    .factory('assessmentsList',assessmentsList);
