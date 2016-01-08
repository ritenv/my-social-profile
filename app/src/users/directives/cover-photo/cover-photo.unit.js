describe('<msp-cover-photo> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile;

  var mockPhoto = '/content/cover-photo2.jpg';

  /**
   * Load our view
   */
  beforeEach(module('src/users/directives/cover-photo/cover-photo.view.html'));

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    compile = $compile;
  }));

  it('Should have the appropriate photo', inject(function($rootScope) {
    element = angular.element('<msp-cover-photo photo="' + mockPhoto + '"></msp-cover-photo>');

    compile(element)(scope);
    scope.$digest();
    var photo = element.find('div').css('background-image');
    expect(photo).toContain(mockPhoto);
  }));
});