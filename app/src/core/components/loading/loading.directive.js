(function(){
  'use strict';

  angular.module('msp.core')
    .directive('mspLoading', [
      mspLoading
    ]);

    function mspLoading() {
      return {
        template: '<div class="loading">' +
                  '<p>Loading...</p>' +
                  '</div>',
        restrict: 'E',
        link: init
      };

      function init(scope, element, attrs) {
        //loading-related behaviors go here, like tracking time for how long the loading item was viewed
      }
    }
})();
