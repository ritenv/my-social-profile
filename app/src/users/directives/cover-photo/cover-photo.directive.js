(function(){
  'use strict';

  angular.module('msp.users')
   .directive('mspCoverPhoto', function() {
    return {
      templateUrl: viewTemplate,
      restrict: 'E',
      scope: true,
      link: init
    };

    function init(scope, element, attrs) {
      if (typeof attrs.photo !== 'undefined') {
        scope.photo = attrs.photo;
      }
    }
  });

  function viewTemplate() {
    return 'src/users/directives/cover-photo/cover-photo.view.html';
  }

})();
