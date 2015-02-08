angular.module('boundless.myGroups', [])

.controller('MyGroupsController', function($scope, $rootScope, $window, Groups, GroupNamePersist, $state, $stateParams) {
  
  angular.forEach(['leaveGroup','addGroup'], function(value){
    $rootScope.$on(value, function(){
      $scope.userGroups();
    });
  });

  $scope.data = {
    usergroups: []
  };

  $scope.groupDetail = function(groupName) {
    GroupNamePersist.setGroupName(groupName);
    $state.go('app.mygroupdetails');
  };

  //fetches all the groups a user is a member of
  $scope.userGroups = function() {
    console.log('get all userGroups');
    var phone = $window.localStorage.getItem('phone');

    Groups.userGroups(phone)
      .then(function(data) {
        // console.log(data);
        $scope.data.usergroups = data;
        $scope.data.usergroups.count = data.length;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.userGroups();
});