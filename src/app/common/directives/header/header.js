'use strict';

/**
 * @name  HeaderCtrl
 * @description Controller
 */
function HeaderCtrl(persona,$state,$mdSidenav) {
    var self = this;

    this.toggleLeft = function(){
        $mdSidenav('left').toggle();
    };

    this.toggleRight = function(){
        $mdSidenav('right').toggle();
    };

    persona.addLoginListener(function (loggedUser) {
        self.isLoading = false;
        self.me = loggedUser;
    });

    persona.addLogoutListener(function () {
        self.me = null;
        self.isLoading = false;
        $mdSidenav('right').toggle();
        $state.go('home');
    });
}

/**
 * @name  mainHeader
 * @description Directive
 */
function mainHeader (){
    return {
        restrict : 'E',
        templateUrl : 'app/common/directives/header/header.tpl.html',
        controller : 'HeaderCtrl',
        controllerAs : 'header',
        replace : true
    }
}


angular.module('common.header', [])
    .controller('HeaderCtrl', HeaderCtrl)
    .directive('mainHeader',mainHeader);

