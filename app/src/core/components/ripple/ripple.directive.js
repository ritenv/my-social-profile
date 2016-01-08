(function(){
  'use strict';

  angular.module('msp.core')
    .directive('mspRipple', [
      '$mdInkRipple',
      mspRipple
    ]);

    function mspRipple($mdInkRipple) {
      return {
        restrict: 'A',
        scope: '=',
        link: init
      };

      function init(scope, element, attrs) {
        $mdInkRipple.attach(element, angular.element(element), {
          center: false,
          dimBackground: false
        });
      }
    }
})();
