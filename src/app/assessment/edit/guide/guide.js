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
              guideList: function(Restangular,$stateParams){
                  console.log($stateParams)
                  return Restangular
                      .one('assessment', $stateParams.id)
                      .getList('guide');
              }
            },
            views: {
                assessmentTab : {
                    templateUrl: 'app/assessment/edit/guide/list.tpl.html',
                    controller: 'GuideListCtrl as guides'
                }
            }
        })
}


/**
 * @name  GuideListCtrl
 * @description Controller of the guide list in the tabs
 */
function GuideListCtrl($mdToast, guideList, $mdDialog, Restangular, $stateParams) {

    var self = this;

    this.list = guideList;

    this.dialog = function(event,guideId){
        $mdDialog
            .show({
                templateUrl: 'app/assessment/edit/guide/dialog.tpl.html',
                controller: 'GuideCtrl as guide',
                targetEvent : event,
                resolve: {
                    data: function(Restangular, $stateParams){
                        if(guideId){
                            return Restangular
                                .one('assessment', $stateParams.id)
                                .one('guide', guideId)
                                .get()
                        }else{
                            return{};
                        }

                    }
                }
            })
            .then(function(response){
                console.log(response)
                if(response.type == 'creation'){
                    self.list.push(response.data);
                    $mdToast.show({
                        template: '<md-toast>Guide created</md-toast>'
                    })
                }else{
                    //todo update the list
                    $mdToast.show({
                        template: '<md-toast>Guide updated</md-toast>'
                    })
                }

            })
    };
    this.remove = function(event, guideId){
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
                //todo remove from the local list
                $mdToast.show({
                    template: '<md-toast>guide removed successfully</md-toast>'
                })
            })
    }
}

/**
 * @name  GuideCtrl
 * @description Controller of the dialog of guide creation
 */
function GuideCtrl(data,$stateParams,Restangular,$mdDialog) {
    var self = this;

    this.data = data;

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

angular.module('assessment.guides',[])
    .config(guideConfig)
    .controller('GuideListCtrl', GuideListCtrl)
    .controller('GuideCtrl', GuideCtrl);


