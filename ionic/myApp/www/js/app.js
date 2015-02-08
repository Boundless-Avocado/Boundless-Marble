angular.module('boundless', ['ionic', 'boundless.controllers', 
                                      'boundless.services', 
                                      'boundless.myGroups', 
                                      'boundless.allGroups', 
                                      'boundless.groupDetails', 
                                      'boundless.createGroup',
                                      'boundless.nearbyGroups'
                            ])

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
        controller: 'MyGroupsController'
      }
    }
  })

  .state('app.mygroupdetails', {
    url: '/mygroupdetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/mygroupdetails.html',
        controller: 'MyGroupDetailsController'
      }
    }
  })

  .state('app.creategroup', {
    url: '/creategroup',
    views: {
      'menuContent': {
        templateUrl: 'templates/creategroup.html',
        controller: 'CreateGroupController'
      }
    }
  })

  .state('app.allgroups', {
    url: '/allgroups',
    views: {
      'menuContent': {
        templateUrl: 'templates/allgroups.html',
        controller: 'AllGroupsController'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/parent');

  $httpProvider.interceptors.push('AttachTokens');
});
