(function(){
  'use strict';

  angular.module('msp.posts')
         .service('msp.posts.services', ['$q', '$resource', postServices]);

  function postServices($q, $resource) {

    /**
     * A local list of all subscribed listeners for new post creation
     * @type {Array}
     */
    var newPostListeners = [];

    return {
      /**
       * Load the full feed
       * @return   {Promise}          A promise that resolves to an array
       */
      loadFeed : function() {
        return endPoints().list.query().$promise;
      },

      /**
       * Load the timeline of a specific user
       * @param    {Object}          params An object containing 'username'
       * @return   {Promise}                 A promise that resolves to an array
       */
      loadTimeline: function(params) {
        var deferred = $q.defer();

        endPoints().list.query(function(postList) {
          var timeline = _.filter(postList, function(post) {
            return post.user.username === params.username;
          });

          deferred.resolve(timeline);
        });

        return deferred.promise;
      },

      /**
       * Save a post
       * @param    {Object}          post The full new post object to save
       * @return   {Promise}               A promise that reolves to an object
       */
      savePost: function(post) {
        var overrides = {
          _id: 'OBJ' + Math.round(Math.random() * 10000), //unique ID simulation (normally done on server)
          content: post.content
        };

        /**
         * NOTE: This is how you would do in an ideal API-driven env, but commented out for the coding challenge
         * @type {Resource}
         */
        // var Post = endPoints().newPost;
        // var newPost = new Post(post);
        // return newPost.$save.$promise;
        
        /**
         * Below is a hack for this coding challenge
         */
        var deferred = $q.defer();
        endPoints().newPost.get(function(newPost) {
          angular.extend(newPost, overrides);
          deferred.resolve(newPost);
          notifyNewPostListeners(newPost);
        });
        return deferred.promise;
      },

      /**
       * A custom event handler
       * @param    {String}          ev The event name
       * @param    {Function}        cb The listener to the event
       * @return   {Boolean}         Whether the event was added to queue
       */
      on: function(ev, cb) {
        if (ev === 'newpost') {
          newPostListeners.push(cb);
          return true;
        }
      }
    };

    /**
     * List of endpoints for this service
     * @return   {Object}          The end points
     */
    function endPoints() {
      return {
        list: $resource('/src/dev/postList.json'),
        newPost: $resource('/src/dev/newPost.json')
      }
    }

    /**
     * Execute each listener
     * @param    {Object}          newPost The full new post object
     * @return   {Void}
     */
    function notifyNewPostListeners(newPost) {
      _.map(newPostListeners, function(listener) {
        listener(newPost);
      });
    }
  }

})();
