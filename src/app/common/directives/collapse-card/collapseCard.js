'use strict';

function collapseCard(collapse){
    return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        template: '<md-whiteframe ng-if="isOpen" class="md-whiteframe-z1 collapse"  ng-transclude></md-whiteframe>',
        link: function(scope, element, attrs, accordionController) {
            scope.$watch(function(){
                return collapse.isOpen;
            },function(){
                scope.isOpen = collapse.isOpen;
            });
        }
    };
}

function collapseButton(collapse){
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude="" ng-click="toggle()"></div>',
        link: function(scope) {
            scope.toggle = function toggle() {
                collapse.isOpen = !collapse.isOpen;
            };
        }
    };
}

function collapse(){
    return {};
}

angular.module('common.collapse',[])
    .directive('collapseCard',collapseCard)
    .directive('collapseButton', collapseButton)
    .factory('collapse',collapse);