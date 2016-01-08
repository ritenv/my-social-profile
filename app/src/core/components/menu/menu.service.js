(function(){
  'use strict';

  angular.module('msp.core')
         .service('msp.core.menuService', ['$q', '$rootScope', '$http', '$resource', menuService]);

  function menuService($q, $rootScope, $http, $resource){

    return {
      /**
       * Load the main menu items
       * @return   {Promise}          A promise that resolves to an array
       */
      loadMenu : function() {
        return endPoints().list.query().$promise;
      }
    };

    /**
     * List of endpoints for this service
     * @return   {Object}          The end points
     */
    function endPoints() {
      return {
        list: $resource('/src/dev/menuItems.json')
      }
    }
  }

})();
