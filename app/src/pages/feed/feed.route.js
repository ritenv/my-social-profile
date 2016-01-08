(function(){
  'use strict';

  angular.module('msp.pages.feed')
         .config(['$routeProvider', '$locationProvider', feedRoutes]);

  function feedRoutes($routeProvider, $locationProvider, $q){
    $routeProvider
      .when('/', {
        templateUrl: '/src/pages/feed/feed.view.html',
        controller: 'msp.pages.feed.main',
        controllerAs: 'page'
      });
  }

})();
