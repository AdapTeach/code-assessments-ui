'use strict';

/**
 * @name  config
 * @description config block
 */
function homeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      views: {
        main: {
          templateUrl: 'app/home/home.tpl.html',
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
  /*jshint validthis:true */
}

angular.module('home', [])
  .config(homeConfig)
  .controller('HomeCtrl', HomeCtrl);
