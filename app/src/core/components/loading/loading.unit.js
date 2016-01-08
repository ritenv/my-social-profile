describe('<msp-loading> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile;

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('Should have the right DOM', inject(function($rootScope) {
    element = angular.element('<msp-loading></msp-loading>');
    compile(element)(scope);
    scope.$digest();

    var loadingDiv = element.find('div').hasClass('loading');
    expect(loadingDiv).toBeTruthy();
  }));
});