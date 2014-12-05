'use strict';

/**
 * @name  guideConfig
 * @description Configuration of the guide list
 */

function guideConfig($stateProvider){
    $stateProvider
        .state('assessment.edit.guides',{
            url: '/guides',
            resolve: {
              list: function(Restangular,$stateParams){
                  return Restangular
                      .one('assessment', $stateParams.id)
                      .getList('guide');
              }
            },
            views: {
                assessmentTab : {
                    templateUrl: 'assessment/edit/guide/list.tpl.html',
                    controller: 'GuideListCtrl as guides'
                }
            }
        });
}


/**
 * @name  GuideListCtrl
 * @description Controller of the guide list in the tabs
 */
function GuideListCtrl($mdToast, list, $mdDialog, Restangular, $stateParams) {

    var self = this;

    this.list = list;

    this.dialog = function(event,guide,index){
        $mdDialog
            .show({
                templateUrl: 'assessment/edit/guide/dialog.tpl.html',
                controller: 'GuideCtrl as guide',
                targetEvent : event,
                locals: {
                    data:  guide || {}
                }
            })
            .then(function(response){
                if(response.type === 'creation'){
                    self.list.push(response.data);
                    $mdToast.show({
                        template: '<md-toast>Guide created</md-toast>'
                    });
                }else{
                    self.list[index] = response.data;
                    $mdToast.show({
                        template: '<md-toast>Guide updated</md-toast>'
                    });
                }

            });
    };
    this.remove = function(event, guideId, index){
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
                .one('guide',guideId)
                .remove())
            .then(function(){
                self.list.splice(index,1);
                $mdToast.show({
                    template: '<md-toast>guide removed successfully</md-toast>'
                });
            });
    };
}

/**
 * @name  GuideCtrl
 * @description Controller of the dialog of guide creation
 */
function GuideCtrl(data,$stateParams,Restangular,$mdDialog) {
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
                .all('guide')
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

angular.module('assessment.edit.guides',[])
    .config(guideConfig)
    .controller('GuideListCtrl', GuideListCtrl)
    .controller('GuideCtrl', GuideCtrl);


