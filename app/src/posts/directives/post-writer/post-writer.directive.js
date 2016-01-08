(function(){
  'use strict';

  angular.module('msp.posts')
    .directive('mspPostWriter', [
      'msp.posts.services',
      function(postServices) {
          return {
            templateUrl: viewTemplate,
            restrict: 'E',
            link: init
          };

          function init(scope, element, attrs) {
            scope.newPost = {};
            scope.savePost = function(isValid) {
              return savePost(scope, isValid)
            };
          }

          function savePost(scope, isValid) {
            if (!isValid) return false;

            return postServices
              .savePost(scope.newPost)
              .then(function(newPost) {
                /**
                 * Create a new object for writing another post, while maintaining permissions
                 * @type {Object}
                 */
                scope.newPost = {permissions: scope.newPost.permissions};
                
                /**
                 * Collapse the post writer
                 * @type {Boolean}
                 */
                scope.writePost = false;
              });

          }
        }
    ]);

  function viewTemplate() {
    return 'src/posts/directives/post-writer/post-writer.view.html';
  }

})();
