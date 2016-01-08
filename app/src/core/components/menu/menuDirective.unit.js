describe('<msp-core-menu> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile;
  var toggleDone = false;

  var mockList = [
    {
      "title": "Feed",
      "pageType": "feed",
      "href": "#/"
    },
    {
      "title": "Timeline",
      "pageType": "timeline",
      "href": "#/me"
    },
    {
      "title": "Logout",
      "pageType": "logout",
      "href": "#/logout"
    }
  ];

  /**
   * Load our view
   */
  beforeEach(module('src/core/components/menu/menu.view.html'));

  /**
   * Mock the users service
   */
  beforeEach(module(function ($provide) {
      $provide.provider('msp.core.menuService', function () { 
          this.$get = function () {
              return {
                  loadMenu: function() {
                    return {
                      then: function(cb) {
                        cb(angular.copy(mockList));
                      }
                    };
                  }
              };
          }
      });

      $provide.provider('$mdSidenav', function() {
        this.$get = function() {
          return function() {
            return {
              toggle: function() {
                toggleDone = !toggleDone;
              }
            };
          }
        }
      });
  }));

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('Should have the right DOM', inject(function($rootScope) {
    element = angular.element('<msp-core-menu></msp-core-menu>');
    compile(element)(scope);
    scope.$digest();

    var buttons = element.find('a');
    expect(buttons.length).toBe(3);
  }));

  it('Should attach toggle event', inject(function($rootScope) {
    element = angular.element('<a msp-toggle-menu ng-click="toggleView()">Open Mobile Menu</a>');
    compile(element)(scope);
    scope.$digest();

    element.scope().toggleView();
    expect(toggleDone).toBeTruthy();
  }));
});