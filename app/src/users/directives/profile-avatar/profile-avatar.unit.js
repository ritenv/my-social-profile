describe('<msp-profile-avatar> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile;

  var mockAvatar = '/content/clark-kent.jpg';

  /**
   * Load our view
   */
  beforeEach(module('src/users/directives/profile-avatar/profile-avatar.view.html'));

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    compile = $compile;
  }));

  it('Should have the appropriate photo', inject(function($rootScope) {
    element = angular.element('<msp-profile-avatar photo="' + mockAvatar + '"></msp-profile-avatar>');

    compile(element)(scope);
    scope.$digest();
    var photo = element.find('img').attr('src');
    expect(photo).toContain(mockAvatar);
  }));
});