'use strict';

/**
 * @name  NavigationCtrl
 * @description Controller
 */
function NavigationCtrl(persona,$state,$mdSidenav) {

}

/**
 * @name  navigation
 * @description Directive
 */
function navigation(){
    return {
        restrict : 'EA',
        templateUrl : 'common/directives/navigation/navigation.tpl.html',
        controller : 'NavigationCtrl',
        controllerAs : 'nav',
        require:'mainHeader',
        scope: {
          assessments: '='
        }
    };
}


angular.module('common.navigation', [])
    .controller('NavigationCtrl', NavigationCtrl)
    .directive('navigation',navigation);

