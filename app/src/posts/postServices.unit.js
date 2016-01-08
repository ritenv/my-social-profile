describe('postServices tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend;
  var postServices;

  var mockList = [
    {
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
    },
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
    },
    {
      "user": {
        "username": "ritenv",
        "name": "Riten Vagadiya",
        "position": "JavaScript Engineer",
        "location": "Dubai",
        "avatar": "/content/avatar-riten.jpg",
        "cover": "/content/cover-photo1.jpg"
      },
      "content": "The ability to inhale and exhale huge volumes of air with great force, capable of extinguishing large fires and moving heavy objects such as cars. Super-breath also allows Superman to hold his breath for extended periods in airless environments.",
      "likes": 4
    }
  ];

  var mockPost = {
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
  };

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile, $injector, $httpBackend) {
    postServices = $injector.get('msp.posts.services');
    scope = $rootScope;
    compile = $compile;
    httpBackend = $httpBackend;

    $httpBackend.whenGET('/src/dev/postList.json').respond(mockList);
    $httpBackend.whenGET('/src/dev/newPost.json').respond(mockPost);
  }));

  it('Should have the appropriate methods', inject(function($rootScope) {
    ['loadFeed', 'loadTimeline', 'savePost', 'on'].map(function(method) {
      expect(angular.isFunction(postServices[method])).toBeTruthy();
    });
  }));

  it('Should load the feed', function() {
    postServices.loadFeed()
      .then(function(list) {
        expect(list.length).toBe(3);
      });
    httpBackend.flush();
  });

  it('Should load a specific user', function() {
    postServices.loadTimeline({username: 'superman'})
      .then(function(timelinePosts) {
        expect(timelinePosts.length).toBe(1);
      });
    
    httpBackend.flush();
  });

  it('Should save new post successfully', function() {
    postServices.savePost(angular.copy(mockPost))
      .then(function(savedPost) {
        expect(savedPost.content).toEqual(mockPost.content);
      });
    httpBackend.flush();
  });

  it('Should successfully listen and fire newPost events', function(done) {
    postServices.on('newpost', done);
    postServices.savePost(angular.copy(mockPost))
      .then(function(savedPost) {
        expect(savedPost.content).toEqual(mockPost.content);
      });
    httpBackend.flush();
  });


});