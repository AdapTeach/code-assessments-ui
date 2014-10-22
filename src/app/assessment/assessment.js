angular.module('assessment', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('assessment',{
                url : '/assessment',
                abstract : true,
                templateUrl : 'assessment/templates/assessments.tpl.html',
                controller : 'AssessmentsCtrl as app',
                resolve : {
                    assessments : function($atAssessment){
                        return $atAssessment.fetchAll();
                    }
                }
            })
            .state('assessment.details',{
                url : '/details/:id',
                resolve : {
                    assessment : function($atAssessment,$stateParams){
                        return $atAssessment.fetchOne($stateParams.id);
                    }
                },
                views : {
                    assess : {
                        templateUrl : 'assessment/templates/assessment.tpl.html',
                        controller : 'AssessmentCtrl as app'
                    }
                }
            })
            .state('assessment.creation',{
                url : '/new',
                views : {
                    assess : {
                        templateUrl : 'assessment/templates/assessment-creation.tpl.html',
                        controller : 'AssessmentCreationCtrl as app'
                    }
                }
            });
    })
    .controller('AssessmentsCtrl',function(assessments){
        this.assessments = assessments;

    })
    .controller('AssessmentCtrl',function(assessment,AceConfig){
        this.AceConfig = AceConfig;
        console.log(assessment)
        this.assessment = assessment;
    })
    .controller('AssessmentCreationCtrl',function($atAssessment,AceConfig){
        this.AceConfig = AceConfig;
        this.createAssessment = $atAssessment.create;
    });