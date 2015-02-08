angular.module('boundless.nearbyGroups', [])

.controller('NearbyGroupsController', function($scope, $window, $location, $http, Groups) {
  //hold data here after quering db
  $scope.data = {
    nearbyGroups : []
  };
  
  $scope.getNearbyGroups = function() {

    navigator.geolocation.getCurrentPosition(function(position) {

      $scope.data.latitude = position.coords.latitude;
      $scope.data.longitude = position.coords.longitude;
      $scope.$apply();
      console.dir($scope.data.latitude);
      console.dir($scope.data.longitude);

      Groups.nearby($scope.data.latitude, $scope.data.longitude)
      //server sends back groups which should be an array containing objects
      .then(function (data) {
        console.dir(data);
        $scope.data.nearbyGroups = data;
      });
    });
  };
});