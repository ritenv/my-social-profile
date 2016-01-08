describe('timelineController tests', function() {
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
                  loadUser: function(username) {
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
    selfCtrl = $controller('msp.pages.timeline.main', {$routeParams: {user: 'me'}});
    buddyCtrl = $controller('msp.pages.timeline.main', {$routeParams: {user: 'ritenv'}});
    scope = $rootScope.$new();
  }));

  it('Should set the correct page type for self', inject(function($rootScope) {
    expect(selfCtrl.pageType).toEqual('timeline');
  }));

  it('Should set the correct page type', inject(function($rootScope) {
    expect(buddyCtrl.pageType).toEqual('buddyProfile');
  }));

  it('Should set an active user', inject(function($rootScope) {
    expect(selfCtrl.activeUser.username).toEqual('ritenv');
  }));
});