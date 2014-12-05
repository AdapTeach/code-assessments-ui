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

angular.module('common.filters', [])
    .filter('uppercase', uppercase);
