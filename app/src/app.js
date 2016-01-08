(function(){
  'use strict';

  // The main app
  angular
      .module('msp.app', ['ngMaterial', 'ngAnimate', 'ngResource', 'msp.core', 'msp.users', 'msp.posts', 'msp.pages.feed', 'msp.pages.timeline'])
      .config(function($mdThemingProvider){
	      $mdThemingProvider.theme('default')
	          .primaryPalette('teal')
	          .accentPalette('red');
      });


})();
