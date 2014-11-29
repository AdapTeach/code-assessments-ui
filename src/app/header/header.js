'use strict';

/**
 * @name  HeaderCtrl
 * @description Controller
 */
function HeaderCtrl(persona,$state) {
    var self = this;
    persona.addLoginListener(function (loggedUser) {
        self.me = loggedUser;
        $state.go('assessment.edit');
    });
    persona.addLogoutListener(function () {
        self.me = null;
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
