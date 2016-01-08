(function(){

  angular
       .module('msp.pages.timeline')
       .controller('msp.pages.timeline.main', [
          '$q',
          '$routeParams',
          '$location',
          'msp.users.services',
          timelineController
       ]);

  function timelineController($q, $routeParams, $location, userServices) {
    var self = this;

    /**
     * Activate the menu
     * @type {String}
     */
    self.pageType = $routeParams.user === 'me' ? 'timeline' : 'buddyProfile';

    userServices
      .loadUser({username: $routeParams.user})
      .then(function(user) {
        if (user) {
          self.activeUser = user;
        } else {
          $location.url('/'); //go to feed
        }
      });
  }
})();
