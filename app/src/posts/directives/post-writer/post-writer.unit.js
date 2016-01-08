describe('<msp-post-writer> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend;
  var receivedPost;

  var mockNewPost = {
    "user": {
      "username": "superman",
      "name": "Superman",
      "position": "World Saviour",
      "location": "Metropolis",
      "avatar": "/content/superman.jpg",
      "cover": "/content/cover-photo4.jpg"
    },
    "content": "Superman is often shown to have flawless, eidetic Memory of everything he has ever seen, read, heard, or otherwise experienced. In most portrayals, Superman is capable of multilingualism and is able to learn, speak and understand any language he comes in contact with.",
    "likes": 300
  };

  /**
   * Load our view
   */
  beforeEach(module('src/posts/directives/post-writer/post-writer.view.html'));

  /**
   * Mock the posts service
   */
  beforeEach(module(function ($provide) {
      $provide.provider('msp.posts.services', function () { 
          this.$get = function () {
              return {
                  savePost: function(newPost) {
                    return {
                      then: function(cb) {
                        receivedPost = angular.copy(newPost);
                        cb(newPost);
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

    httpBackend.expectGET('assets/svg/post.svg').respond('');
    httpBackend.expectGET('assets/svg/close.svg').respond('');
  }));

  it('Should have a text area and a dropdown', inject(function($rootScope) {
    element = angular.element('<msp-post-writer></msp-post-writer>');

    compile(element)(scope);
    scope.$digest();

    /**
     * Text area and dropdowns are not rendered by default
     */
    var textArea = element.find('textarea');
    var dropdown = element.find('md-select');
    expect(textArea.length).toBe(0);
    expect(dropdown.length).toBe(0);

    element.scope().writePost = true;
    scope.$digest();

    /**
     * Now that writePost is true, they should be rendered
     */
    textArea = element.find('textarea');
    dropdown = element.find('md-select');
    expect(textArea.length).toBe(1);
    expect(dropdown.length).toBe(1);
  }));

  it('Should be able to save new post', inject(function($rootScope) {
    element = angular.element('<msp-post-writer></msp-post-writer>');

    compile(element)(scope);
    scope.$digest();

    var elScope = element.scope();
    angular.extend(elScope.newPost, mockNewPost);
    elScope.savePost(true);

    expect(receivedPost.content).toBe(mockNewPost.content);
  }));

  it('Should not save invalid post', inject(function($rootScope) {
    element = angular.element('<msp-post-writer></msp-post-writer>');

    compile(element)(scope);
    scope.$digest();

    var elScope = element.scope();
    angular.extend(elScope.newPost, mockNewPost);
    var result = elScope.savePost(false);

    expect(result).toBeFalsy();
  }));
});