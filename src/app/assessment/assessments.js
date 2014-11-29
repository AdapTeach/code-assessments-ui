'use strict';

/**
 * @name  config
 * @description config block
 */
function assessmentsConfig($stateProvider) {
    $stateProvider.state('assessment', {
        url: '/assessment',
        abstract : true,
        resolve: {
            list: function (Restangular) {
                return Restangular.all('assessment').getList();
            }
        },
        views: {
            main: {
                templateUrl: 'app/assessment/assessments.tpl.html',
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
 * @name  Assessments
 * @description Controller
 */
function AssessmentsCtrl(Restangular,ACE, $mdBottomSheet, list) {
    console.log(Restangular.all('assessment').getList())
    var self = this;
    self.list = list;

    this.AceConfig = ACE;
    this.bottomSheet = function ($event, type) {
        var option = {
            targetEvent: $event
        };
        switch (type) {
            case 'tip':
                option.templateUrl = 'app/assessment/tip/bottom.tpl.html';
                option.controller = 'TipBottomCtrl as tip';
                break;
            case 'guide':
                option.templateUrl = 'app/assessment/guide/bottom.tpl.html';
                option.controller = 'GuideBottomCtrl as guide';
                break;
            case 'test':
                option.templateUrl = 'app/assessment/test/bottom.tpl.html';
                option.controller = 'TestBottomCtrl as test';
                break;
        }
        $mdBottomSheet.show(option);
    };
}

angular.module('assessment', [
    'assessment.edit',
    'assessment.guides',
    'assessment.tips',
    'assessment.tests',
    'assessment.compilation'
])
    .constant('ACE', ACE)
    .config(assessmentsConfig)
    .controller('AssessmentsListCtrl', AssessmentsCtrl);
