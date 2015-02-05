angular.module('boundless.controllers', ['boundless.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth) {
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

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogIn.hide();
  };

  $scope.closeSignUp = function() {
    $scope.modalSignUp.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogIn.show();
  };

  $scope.signUp = function() {
    $scope.modalSignUp.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doSignUp = function() {
    console.log('Doing signup', $scope.signupData);
    Auth.signup($scope.signupData);

    $timeout(function() {
      $scope.closeSignUp();
    }, 1000);
  };
});