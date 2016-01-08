module.exports = function(config){
    config.set({
    basePath : '../app/',

    preprocessors: {
      '**/*.view.html': ['ng-html2js'],
      'src/**/!(*.unit)*.js': ['coverage']
    },

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-mocks/angular-mocks.js',

      'src/core/core.js',
      'src/core/components/**/!(*.unit)*.js',
      'src/core/components/menu/menu.service.js',

      'src/core/components/ripple/ripple.directive.js',
      'src/core/components/loading/loading.directive.js',
      
      'src/users/users.js',
      'src/users/**/!(*.unit).js',

      'src/posts/posts.js',
      'src/posts/**/!(*.unit).js',

      'src/pages/feed/feed.js',
      'src/pages/feed/**/!(*.unit).js',

      'src/pages/timeline/timeline.js',
      'src/pages/timeline/**/!(*.unit).js',
      'src/app.js',
      'src/**/*.view.html',
      'src/**/*.unit.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    reporters: ['spec', 'junit', 'coverage'],

    junitReporter : {
      outputFile: '../testOut/unit.xml',
      suite: 'unit'
    },

    coverageReporter: {
      type: 'html',
      dir: '../coverage/',
      subdir: '.'
    },

})}
