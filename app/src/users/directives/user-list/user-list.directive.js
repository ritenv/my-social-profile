(function(){
  'use strict';

  angular.module('msp.users')
   .directive('mspUserList', [
      'msp.users.services',
      function(userServices) {
          return {
            templateUrl: viewTemplate,
            restrict: 'E',
            scope: true,
            link: init
          };

          function init(scope, element, attrs) {
            scope.heading = attrs.heading;

            userServices
              .loadFriends()
              .then(function(users) {
                scope.users = users;
              });
          }
        }
    ]);

  function viewTemplate() {
    return 'src/users/directives/user-list/user-list.view.html';
  }

})();
