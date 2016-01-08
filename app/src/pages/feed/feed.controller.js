(function(){

  angular
       .module('msp.pages.feed')
       .controller('msp.pages.feed.main', [
          '$q',
          '$routeParams',
          '$location',
          'msp.users.services',
          feedController
       ]);

  function feedController($q, $routeParams, $location, userServices) {
    var self = this;
    
    /**
     * Activate the menu
     * @type {String}
     */
    self.pageType = 'feed';

    userServices
      .loadCurrentUser()
      .then(function(user) {
        if (typeof user !== 'undefined') {
          self.activeUser = user;
        }
      });
  }
})();
