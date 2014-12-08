'use strict';

function collapseCard(collapse){
    return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        templateUrl: 'common/directives/collapse-card/collapse-card.tpl.html',
        link: function(scope, element) {
            scope.$watch(function(){
                return collapse.isOpen;
            },function(){
                if(collapse.isOpen !== undefined){
                    element.find('section').toggleClass('open');
                }
            });
        }
    };
}

function collapseButton(collapse){
    return {
        restrict: 'EA',
        scope: {
            tooltip: '@'
        },
        templateUrl: 'common/directives/collapse-card/collapse-button.tpl.html',
        link: function(scope) {
            scope.button = collapse;
            scope.toggle = function toggle() {
                collapse.isOpen = !collapse.isOpen;
            };
        }
    };
}

function collapse(){
    return {};
}

angular.module('common.directives.collapse',[])
    .directive('collapseCard',collapseCard)
    .directive('collapseButton', collapseButton)
    .factory('collapse',collapse);