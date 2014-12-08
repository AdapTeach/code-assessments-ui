'use strict';

/**
 * @name  uppercase
 * @description uppercase filter
 */
function uppercase() {
    return function (text) {
        return text ? text.toUpperCase() : text;
    };
}

/**
 * @name  groupBy
 * @description groupBy filter
 */
function groupBy(){
    return function(items,group){
        return items.filter(function(element, index, array) {
            return parseInt(element.time)==group;
        });
    }
}


angular.module('common.filters', [])
    .filter('uppercase', uppercase)
    .filter('groupBy',groupBy);
