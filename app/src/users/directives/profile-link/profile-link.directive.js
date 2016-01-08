(function(){
  'use strict';

  angular.module('msp.users')
   .directive('mspProfileLink', [
      'msp.users.services',
      function(userServices) {
          return {
            restrict: 'A',
            scope: true,
            link: init
          };

          function init(scope, element, attrs) {
            /**
             * This is a quick hack to maintain the URL
             */
            angular.element(element).attr('href', '#/' + attrs.mspProfileLink);
          }
        }
    ]);

})();
