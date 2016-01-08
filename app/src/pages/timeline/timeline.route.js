(function(){
  'use strict';

  angular.module('msp.pages.timeline')
         .config(['$routeProvider', '$locationProvider', feedRoutes]);

  function feedRoutes($routeProvider, $locationProvider, $q){
    $routeProvider
      .when('/:user', {
        templateUrl: '/src/pages/timeline/timeline.view.html',
        // reloadOnSearch: false,
        controller: 'msp.pages.timeline.main',
        controllerAs: 'page'
      });
  }

})();
