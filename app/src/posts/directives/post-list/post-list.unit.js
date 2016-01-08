describe('<msp-post-list> tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend, eventListener;

  var mockFeed = [
    {
      "user": {
        "username": "clark",
        "name": "Clark Kent",
        "position": "Reporter",
        "location": "Metropolis",
        "avatar": "/content/clark-kent.jpg",
        "cover": "/content/cover-photo2.jpg"
      },
      "content": "Superman's powers rely on his cells' ability to absorb and metabolize solar energy from yellow stars like Earth's sun.",
      "likes": 0
    }
  ];

  var mockTimeline = [
    {
      "user": {
        "username": "ritenv",
        "name": "Riten Vagadiya",
        "position": "JavaScript Engineer",
        "location": "Dubai",
        "avatar": "/content/avatar-riten.jpg",
        "cover": "/content/cover-photo1.jpg"
      },
      "content": "While most authors prefer to portray him as a brawler in combat, relying more on the magnitude of his powers for victory rather than any real martial prowess, there have been some exceptions.",
      "likes": 0
    }
  ];

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
  beforeEach(module('src/posts/directives/post-list/post-list.view.html'));

  /**
   * Mock the posts service
   */
  beforeEach(module(function ($provide) {
      $provide.provider('msp.posts.services', function () { 
          this.$get = function () {
              return {
                  loadFeed: function() {
                    return {
                      then: function(cb) {
                        cb(angular.copy(mockFeed));
                      }
                    };
                  },
                  loadTimeline: function() {
                    return {
                      then: function(cb) {
                        cb(angular.copy(mockTimeline));
                      }
                    };
                  },
                  on: function(ev, listener) {
                    eventListener = listener;
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

    httpBackend.expectGET('assets/svg/thumb.svg').respond('');
    httpBackend.expectGET('assets/svg/post.svg').respond('');
  }));

  it('Should load FEED with a list of posts', inject(function($rootScope) {
    element = angular.element('<msp-post-list type="feed"></msp-post-list>');

    compile(element)(scope);
    scope.$digest();

    var list = element.find('md-list-item');
    expect(list.length).toBe(mockFeed.length);
    var name = element.find('h3').find('a').html();
    expect(name).toBe(mockFeed[0].user.name);
  }));

  it('Should load TIMELINE with a list of posts', inject(function($rootScope) {
    element = angular.element('<msp-post-list type="timeline"></msp-post-list>');

    compile(element)(scope);
    scope.$digest();

    var list = element.find('md-list-item');
    expect(list.length).toBe(mockTimeline.length);
    var name = element.find('h3').find('a').html();
    expect(name).toBe(mockTimeline[0].user.name);
  }));

  it('Should be able to prepend a new post in the FEED, real-time', inject(function($rootScope) {
    // scope.feed = angular.copy(mockFeed); //create a feed on this scope
    element = angular.element('<msp-post-list type="feed"></msp-post-list>');

    compile(element)(scope); //let the directive inherit the scope
    scope.$digest();

    /**
     * eventListener consists of the function that is to be executed each time a new post is created by user
     * this ensures that the listener is working well
     * For the test, we simply invoke the listener with a mock post
     * and check if it has been prepended
     */
    eventListener(angular.copy(mockNewPost));
    scope.$digest();

    expect(element.scope().feed.length).toBe(mockFeed.length + 1); //new post should be added
    expect(element.scope().feed.shift().user.name).toBe(mockNewPost.user.name); //new post should match our mock post
  }));

});