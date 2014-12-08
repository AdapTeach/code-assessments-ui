'use strict';

/**
 * @name  NavigationCtrl
 * @description Controller
 */
function NavigationCtrl(Restangular) {
    this.assessments = Restangular.all('assessment').getList().$object;
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
        controllerAs: 'nav',
        scope: {
          assessments: '='
        }
    };
}


angular.module('common.directives.navigation', [])
    .controller('NavigationCtrl', NavigationCtrl)
    .directive('navigation',navigation);

