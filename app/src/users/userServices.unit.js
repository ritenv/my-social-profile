describe('userServices tests', function() {
  beforeEach(module('msp.app'));

  var element, scope, compile, httpBackend;
  var userServices;

  var mockList = [
    {
      "username": "clark",
      "name": "Clark Kent",
      "position": "Reporter",
      "location": "Metropolis",
      "avatar": "/content/clark-kent.jpg",
      "cover": "/content/cover-photo2.jpg"
    },
    {
      "username": "kal",
      "name": "Kal El",
      "position": "Alien Soul",
      "location": "Krypton",
      "avatar": "/content/kal-el.jpg",
      "cover": "/content/cover-photo3.png"
    },
    {
      "username": "superman",
      "name": "Superman",
      "position": "World Saviour",
      "location": "Metropolis",
      "avatar": "/content/superman.jpg",
      "cover": "/content/cover-photo4.jpg"
    },
    {
      "username": "ritenv",
      "name": "Riten Vagadiya",
      "position": "JavaScript Engineer",
      "location": "Dubai",
      "avatar": "/content/avatar-riten.jpg",
      "cover": "/content/cover-photo1.jpg"
    }
  ];

  var mockUser = {
    "username": "ritenv",
    "name": "Riten Vagadiya",
    "position": "JavaScript Engineer",
    "location": "Dubai",
    "avatar": "/content/avatar-riten.jpg",
    "cover": "/content/cover-photo1.jpg"
  };

  /**
   * Inject pre-requisites
   */
  beforeEach(inject(function($rootScope, $compile, $injector, $httpBackend) {
    userServices = $injector.get('msp.users.services');
    scope = $rootScope;
    compile = $compile;
    httpBackend = $httpBackend;

    $httpBackend.whenGET('/src/dev/friendList.json').respond(mockList);
    $httpBackend.whenGET('/src/dev/userList.json').respond(mockList);
    $httpBackend.whenGET('/src/dev/currentUser.json').respond(mockUser);
  }));

  it('Should have the appropriate methods', inject(function($rootScope) {
    ['loadFriends', 'loadUser', 'loadCurrentUser'].map(function(method) {
      expect(angular.isFunction(userServices[method])).toBeTruthy();
    });
  }));

  it('Should load the friends list', function() {
    userServices.loadFriends()
      .then(function(list) {
        expect(list.length).toBe(4);
      });
    httpBackend.flush();
  });

  it('Should load a specific user', function() {
    userServices.loadUser({username: 'clark'})
      .then(function(user) {
        expect(user.name).toBe('Clark Kent');
      });
    
    userServices.loadUser({username: 'me'})
      .then(function(user) {
        expect(user.username).toBe('ritenv');
      });
    
    httpBackend.flush();
  });

  it('Should load current user', function() {
    userServices.loadCurrentUser()
      .then(function(user) {
        expect(user.username).toBe('ritenv');
      });
    httpBackend.flush();
  });


});