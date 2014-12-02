'use strict';

/**
 * @name  guideConfig
 * @description Configuration of the guide list
 */

function startConfig($stateProvider){
    $stateProvider
        .state('assessment.detail.base',{
            url: '/base',
            resolve: {
                data: function(Restangular,$stateParams){
                    return Restangular
                        .one('assessment', $stateParams.id)
                        .get();
                }
            },
            views: {
                assessmentTab : {
                    templateUrl: 'app/assessment/detail/base/base.tpl.html',
                    controller: 'BaseCtrl as base'
                }
            }
        })
}

/**
 * @name  BaseCtrl
 * @description Controller of the form of assessment creation
 */
function BaseCtrl(data,Restangular,$mdToast,$mdBottomSheet,$stateParams) {

}



angular.module('assessment.detail.base',[])
    .config(startConfig)
    .controller('BaseCtrl', BaseCtrl);
