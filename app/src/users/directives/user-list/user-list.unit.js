describe('<msp-user-list> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend;

  var mockUserList = [
    {
      "username": "clark",
      "name": "Clark Kent",
      "position": "Reporter",
      "location": "Metropolis",
      "avatar": "/content/clark-kent.jpg",
      "cover": "/content/cover-photo2.jpg"
    }
  ];

  /**
   * Load our view
   */
  beforeEach(module('src/users/directives/user-list/user-list.view.html'));

  /**
   * Mock the users service
   */
  beforeEach(module(function ($provide) {
      $provide.provider('msp.users.services', function () { 
          this.$get = function () {
              return {
                  loadFriends: function() {
                    return {
                      then: function(cb) {
                        cb(angular.copy(mockUserList));
                      }
                    };
                  }
              };
          }
      });
  }));

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile, $httpBackend) {
    scope = $rootScope;
    compile = $compile;
    httpBackend = $httpBackend;
  }));

  it('Should have the appropriate list', inject(function($rootScope) {
    element = angular.element('<msp-user-list></msp-user-list>');

    compile(element)(scope);
    scope.$digest();

    var friendsList = element.find('md-list');
    var list = element.find('md-list').find('md-list-item');
    var name = element.find('h3').html(); //the first one
    expect(friendsList.length).toBe(1);
    expect(list.length).toBe(1);
    expect(name).toBe(mockUserList[0].name);
  }));
});