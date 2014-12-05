'use strict';

/**
 * @name  compilationUnitConfig
 * @description Config of the compilation-unit state
 */
function compilationUnitConfig($stateProvider) {
    $stateProvider
        .state('assessment.detail.compilationunit',{
            url: '/compilationunit',
            resolve: {
              list: function(Restangular,$stateParams){
                  return Restangular
                      .one('assessment',$stateParams.id)
                      .getList('compilationunit');
              }
            },
            views: {
                assessmentTab: {
                    templateUrl: 'assessment/detail/compilationUnit/list.tpl.html',
                    controller: 'CompilationUnitListCtrl as compilationUnits'
                }
            }
        });
}



/**
 * @name  CompilationUnitCtrl
 * @description Controller of the test list in the tabs
 */
function CompilationUnitListCtrl($mdDialog, list, Restangular, $stateParams, $mdToast) {

    var self = this;

    this.list = list;

    console.log(list);

    this.dialog = function(event,unit,index) {
        $mdDialog
            .show({
                templateUrl: 'assessment/detail/compilationUnit/dialog.tpl.html',
                controller: 'CompilationUnitCtrl as unit',
                targetEvent: event,
                locals: {
                    data:  unit || { type : 'provided'}
                }
            })
            .then(function (response) {
                if (response.type === 'creation') {
                    self.list.push(response.data);
                    $mdToast.show({
                        template: '<md-toast>Compilation-unit created !</md-toast>'
                    });
                } else {
                    self.list[index] = response.data;
                    $mdToast.show({
                        template: '<md-toast>Compilation-unit updated !</md-toast>'
                    });
                }
            });
    };

    this.remove = function(event, cuId, index){
        var confirm = $mdDialog
            .confirm()
            .title('Confirm suppression ?')
            .ariaLabel('suppression dialog')
            .ok('Remove')
            .cancel('Cancel')
            .targetEvent(event);

        $mdDialog.show(confirm)
            .then(Restangular
                .one('assessment',$stateParams.id)
                .one('compilationunit',cuId)
                .remove()
            )
            .then(function(){
                self.list.splice(index,1);
                $mdToast.show({
                    template: '<md-toast>compilation unit removed successfully</md-toast>'
                });
            });
    };
}

/**
 * @name  CompilationUnitCtrl
 * @description Controller of the compilation unit detail dialog
 */
function CompilationUnitCtrl(Restangular, $mdDialog, data, $stateParams) {
    var self = this;
    this.data = Restangular.copy(data);

    this.save = function(){
        if (self.data._id) {
            self.data
                .put()
                .then(function (updatedGuide) {
                    $mdDialog.hide({
                        type: 'update',
                        data: updatedGuide
                    });
                });
        } else {
            Restangular
                .one('assessment',$stateParams.id)
                .all('compilationunit')
                .post(self.data)
                .then(function (createdGuide) {
                    $mdDialog.hide({
                        type: 'creation',
                        data: createdGuide
                    });
                });
        }
    };

    this.cancel = function(){
        $mdDialog.cancel();
    };
}


angular.module('assessment.detail.compilation',[])
    .config(compilationUnitConfig)
    .controller('CompilationUnitListCtrl', CompilationUnitListCtrl)
    .controller('CompilationUnitCtrl', CompilationUnitCtrl);

