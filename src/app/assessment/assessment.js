angular.module('assessment', [
    'ui.router'
])
    .config(function($stateProvider){
        $stateProvider
            .state('assessment',{
                url : '/assessment',
                abstract : true,
                templateUrl : 'assessment/templates/assessments.tpl.html',
                controller : 'AssessmentsCtrl',
                resolve : {
                    list : function(atAssessment){
                        return atAssessment.findAll();
                    }
                }
            })
            .state('assessment.details',{
                url : '/details/:id',
                views : {
                    assess : {
                        templateUrl : 'assessment/templates/assessment.tpl.html',
                        controller : 'AssessmentCtrl as assessment'
                    }
                }
            })
            .state('assessment.creation',{
                url : '/new',
                views : {
                    assess : {
                        templateUrl : 'assessment/templates/assessment-creation.tpl.html',
                        controller : 'AssessmentCreationCtrl as assessment'
                    }
                }
            });
    })
    .controller('AssessmentsCtrl',function($scope,AceConfig,$mdBottomSheet,atAssessment){
        atAssessment.bindAll($scope,'list');
        $scope.AceConfig = AceConfig;
        $scope.bottomSheet = function($event,type){
            var option = {
                targetEvent : $event
            };
            switch(type){
                case 'tip':
                    option.templateUrl = 'assessment/templates/bottom/tip.tpl.html';
                    option.controller = 'TipCtrl as tip';
                    break;
                case 'guide':
                    option.templateUrl = 'assessment/templates/bottom/guide.tpl.html';
                    option.controller = 'GuideCtrl as guide';
                    break;
                case 'test':
                    option.templateUrl = 'assessment/templates/bottom/test.tpl.html';
                    option.controller = 'TestCtrl as test';
                    break;
            }
            $mdBottomSheet.show(option);
        };
    })
    .controller('AssessmentCtrl',function($stateParams,atAssessment,$mdToast,$state){
        this.item = atAssessment.get($stateParams.id);
        this.destroy = function(){
            atAssessment.destroy(this.item._id).then(function(){
                $mdToast.show({
                    template : '<md-toast>Assessment removed</md-toast>'
                });
                $state.go('assessment.creation');
            }).catch(function(err){
                console.log(err);
            });
        };

        this.update = function(){
            atAssessment.save(this.item._id).then(function(){
                $mdToast.show({
                    template : '<md-toast>Assessment updated</md-toast>'
                })
            }).catch(function(err){
                console.log(err);
            });
        };
    })
    .controller('AssessmentCreationCtrl',function(DS,atAssessment,$state,$mdToast){
        this.create = function(){
            var temp = angular.copy(this);
            delete temp.create;
            atAssessment.create(temp).then(function(assess){
                console.log(assess)
                $mdToast.show({
                    template : '<md-toast>Assessment created</md-toast>'
                });
                $state.go('assessment.details',{ id : assess._id });
            }).catch(function(err){
                console.log(err);
            });
        };
    });