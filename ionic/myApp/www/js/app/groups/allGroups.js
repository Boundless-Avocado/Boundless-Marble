angular.module('boundless.allGroups', [])

.controller('AllGroupsController', function($scope, $window, $location, Groups) {
  //hold data here after quering db
  $scope.data = {
    groups: Groups.data
  };

  $scope.joinGroup = function(groupName) {
    var phone = $window.localStorage.getItem('phone');
    console.log('group: ' + groupName);
    var data = {
      phone: phone, 
      name: groupName
    };
    console.log(phone + ' joined the group: ' + groupName);

    Groups.joinGroup(data)
      .then(function() {
        // $location.path('/groups');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.getGroups = function() {
    console.log('get group command called');
    Groups.getGroups()
      //server sends back groups which should be an array containing objects
      .then(function (data) {
        $scope.data.groups = data;
        $scope.data.groupslength = data.length;
    });
  };

  $scope.getGroups();
});