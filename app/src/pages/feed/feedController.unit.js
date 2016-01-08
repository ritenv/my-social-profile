describe('feedController tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, ctrl;

  var mockUser = {
    "username": "ritenv",
    "name": "Riten Vagadiya",
    "position": "JavaScript Engineer",
    "location": "Dubai",
    "avatar": "/content/avatar-riten.jpg",
    "cover": "/content/cover-photo1.jpg"
  };

  beforeEach(module(function ($provide) {
      $provide.provider('msp.users.services', function () { 
          this.$get = function () {
              return {
                  loadCurrentUser: function() {
                    return {
                      then: function(cb) {
                        cb(angular.copy(mockUser));
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
  beforeEach(inject(function($rootScope, $controller) {
    ctrl = $controller('msp.pages.feed.main');
    scope = $rootScope.$new();
  }));

  it('Should set the correct page type', inject(function($rootScope) {
    expect(ctrl.pageType).toEqual('feed');
  }));

  it('Should set an active user', inject(function($rootScope) {
    expect(ctrl.activeUser.username).toEqual('ritenv');
  }));
});