// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('boundless', ['ionic', 'boundless.controllers', 'boundless.services', 'boundless.groups'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.parent', {
    url: '/parent',
    views: {
      'menuContent': {
        templateUrl: 'templates/parent.html'
      }
    }
  })

  .state('app.mygroups', {
    url: '/mygroups',
    views: {
      'menuContent': {
        templateUrl: 'templates/mygroups.html',
        controller: 'GroupsController'
      }
    }
  })

  .state('app.creategroup', {
    url: '/creategroup',
    views: {
      'menuContent': {
        templateUrl: 'templates/creategroup.html',
        controller: 'GroupsController'
      }
    }
  })

  .state('app.findgroup', {
    url: '/findgroup',
    views: {
      'menuContent': {
        templateUrl: 'templates/findgroup.html',
        controller: 'GroupsController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/parent');
});
