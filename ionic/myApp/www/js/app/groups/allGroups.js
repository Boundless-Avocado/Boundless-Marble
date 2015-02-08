angular.module('boundless.allGroups', [])

.controller('AllGroupsController', function($scope, $window, $location, Groups, $state) {
  //hold data here after quering db
  $scope.data = {
    groups: Groups.data
  };

  $scope.addGroup = function(groupName) {
    var phone = $window.localStorage.getItem('phone');
    console.log('group: ' + groupName);
    var data = {
      phone: phone, 
      name: groupName
    };
    console.log(phone + ' joined the group: ' + groupName);

    Groups.addGroup(data)
      .then(function(resp) {
        if (resp) {
          $scope.$emit('addGroup');
        }
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