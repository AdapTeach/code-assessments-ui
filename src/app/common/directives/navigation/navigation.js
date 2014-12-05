'use strict';

/**
 * @name  NavigationCtrl
 * @description Controller
 */
function NavigationCtrl(){

}

/**
 * @name  navigation
 * @description Directive
 */
function navigation (){
    return {
        restrict : 'E',
        templateUrl : 'common/directives/navigation/navigation.tpl.html',
        controller : 'NavigationCtrl',
        controllerAs : 'nav',
        replace : true
    };
}

angular.module('common.navigation', [])
    .controller('NavigationCtrl', NavigationCtrl)
    .directive('navigation',navigation);
