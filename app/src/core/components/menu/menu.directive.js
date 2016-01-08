(function(){
  'use strict';

  angular.module('msp.core')
    .directive('mspCoreMenu', [
      '$route',
      '$rootScope',
      'msp.core.menuService',
      mspCoreMenu
    ])
    .directive('mspToggleMenu', [
      '$mdBottomSheet',
      '$mdSidenav',
      mspToggleMenu
    ]);

    function mspCoreMenu($route, $rootScope, menuService) {
      return {
        templateUrl: viewTemplate,
        restrict: 'E',
        scope: true,
        link: init
      };

      function init(scope, element, attrs) {
        menuService
          .loadMenu()
          .then(function(menuItems) {
            scope.menuItems = menuItems;
          });

        $rootScope.$on('$routeChangeSuccess', function(e, data) {
          _.map(scope.menuItems, function(menuItem) {
            menuItem.active = (data.scope.page.pageType === menuItem.pageType);
          })
        });
      }

      function viewTemplate() {
        return 'src/core/components/menu/menu.view.html';
      }
    }

    function mspToggleMenu($mdBottomSheet, $mdSidenav) {
      return {
        restrict: 'A',
        scope: true,
        link: init
      };

      function init(scope, element, attrs) {
        scope.toggleView = toggleView;
      }

      function toggleView() {
        $mdSidenav('left').toggle();
      }
    }

})();
