'use strict';

/**
 * @name  HeaderCtrl
 * @description Controller
 */
function HeaderCtrl(persona,$state,$mdSidenav) {
    var self = this;
    self.state = $state.current.name;

    this.toggleLeft = function(){
        $mdSidenav('left').toggle();
    };

    persona.addLoginListener(function (loggedUser) {
        self.isLoading = false;
        self.me = loggedUser;
        //$state.go('assessment.edit');
    });

    persona.addLogoutListener(function () {
        self.me = null;
        self.isLoading = false;
        $state.go('home');
    });
}

function mainHeader (){
    return {
        restrict : 'E',
        templateUrl : 'app/header/header.tpl.html',
        controller : 'HeaderCtrl',
        controllerAs : 'header',
        replace : true
    }
}

angular.module('header', [])
    .controller('HeaderCtrl', HeaderCtrl)
    .directive('mainHeader',mainHeader);
