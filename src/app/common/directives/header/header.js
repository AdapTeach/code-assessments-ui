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

    this.isLoading = true;

    persona.init();

    persona.addLoginListener(function (loggedUser) {
            self.isLoading = false;
            self.me = loggedUser;
        });

    persona.addLogoutListener(function () {
            self.me = null;
            self.isLoading = false;
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
        templateUrl : 'common/directives/header/header.tpl.html',
        controller : 'HeaderCtrl',
        controllerAs : 'header',
        replace : true
    };
}


angular.module('common.directives.header', [])
    .controller('HeaderCtrl', HeaderCtrl)
    .directive('mainHeader',mainHeader);

