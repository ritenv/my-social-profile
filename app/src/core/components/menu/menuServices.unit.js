describe('menuServices tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend;
  var menuServices;

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
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile, $injector, $httpBackend) {
    menuServices = $injector.get('msp.core.menuService');
    scope = $rootScope;
    compile = $compile;
    httpBackend = $httpBackend;

    $httpBackend.whenGET('/src/dev/menuItems.json').respond(mockList);
  }));

  it('Should have the appropriate methods', inject(function($rootScope) {
    ['loadMenu'].map(function(method) {
      expect(angular.isFunction(menuServices[method])).toBeTruthy();
    });
  }));

  it('Should load the menu items', function() {
    menuServices.loadMenu()
      .then(function(list) {
        expect(list.length).toBe(3);
      });
    httpBackend.flush();
  });
});