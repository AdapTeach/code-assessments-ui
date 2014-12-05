'use strict';

/**
 * @name  homeConfig
 * @description config for the state home
 */
function homeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        main: {
          templateUrl: 'home/home.tpl.html',
          controller: 'HomeCtrl as home'
        }
      }
    });
}

/**
 * @name  HomeCtrl
 * @description Controller
 */
function HomeCtrl() {

}

angular.module('home', [])
  .config(homeConfig)
  .controller('HomeCtrl', HomeCtrl);
