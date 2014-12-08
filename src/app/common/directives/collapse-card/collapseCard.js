'use strict';

function collapseCard(collapse){
    return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        templateUrl: 'common/directives/collapse-card/collapse-card.tpl.html',
        link: function(scope, element) {
            element.addClass('open');
            element.find('section').toggleClass('open');
            scope.$watch(function(){
                return collapse.isOpen;
            },function(){
                element.find('section').toggleClass('open');
                scope.isOpen = collapse.isOpen;
                console.log(collapse.isOpen)
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
            console.log(scope)
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