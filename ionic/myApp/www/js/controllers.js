angular.module('boundless.controllers', ['boundless.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, Auth, $window, $state) {
  // Form data for the login modal


  $scope.loginData = {};
  $scope.signupData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogIn = modal;
  });

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSignUp = modal;
  });
  
  $scope.gomygroups = function() {
    $state.go('app.mygroups');
  };

  $scope.closeLogin = function() {
    $scope.modalLogIn.hide();
  };

  $scope.closeSignUp = function() {
    $scope.modalSignUp.hide();
  };

  $scope.login = function() {
    $scope.modalLogIn.show();
  };

  $scope.signUp = function() {
    $scope.modalSignUp.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    Auth.signin($scope.loginData)
    .then(function() {
      $window.localStorage.setItem('phone', $scope.loginData.phone);
    });

    $timeout(function() {
      $scope.closeLogin();
    }, 500);
  };

  // TODO - change stat after successful signin to mygroups
  $scope.doSignUp = function() {
    console.log('Doing signup', $scope.signupData);
    Auth.signup($scope.signupData)
    .then(function() {
      $window.localStorage.setItem('phone', $scope.signupData.phone);
    });

    $timeout(function() {
      $scope.closeSignUp();
    }, 500);
  };

});