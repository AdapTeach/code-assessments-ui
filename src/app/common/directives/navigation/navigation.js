'use strict';

/**
 * @name  NavigationCtrl
 * @description Controller
 */
function NavigationCtrl($scope) {

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
        scope: {
          assessments: '='
        }
    };
}


angular.module('common.directives.navigation', [])
    .controller('NavigationCtrl', NavigationCtrl)
    .directive('navigation',navigation);

