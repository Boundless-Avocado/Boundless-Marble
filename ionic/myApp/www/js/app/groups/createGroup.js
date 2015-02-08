angular.module('boundless.createGroup', [])

.controller('CreateGroupController', function($scope, $window, $location, $http, Groups) {

  $scope.data = {

  };

  $scope.createGroup = function() {
    
    var data = {
      phone:  $window.localStorage.getItem('phone'),
      name: $scope.data.newGroup,
      latitude: $scope.data.latitude || 0,
      longitude: $scope.data.longitude || 0,
      physicalAddress: $scope.data.physicalAddress,
    };

    Groups.createGroup(data)
      .then(function() {
        // $location.path('/groups');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(function(position) {

      $scope.data.latitude = position.coords.latitude;
      $scope.data.longitude = position.coords.longitude;
      $scope.$apply();
      console.dir($scope.data.latitude);
      console.dir($scope.data.longitude);
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAetgCNCAt4BQjBptlQMWCbAEbORSUdwJg';

      // $http.get(url).
      // success(function(data, status, headers, config) {
      //   $scope.data.physicalAddress = data.results[0].formatted_address;
      // }).
      // error(function(data, status, headers, config) {
      //  $scope.data.physicalAddress = 'Unknown';
      // }); 
    });
  };
});