angular.module('boundless.groups', [])

.controller('MyGroupDetailsController', function($scope, $ionicModal, $timeout, $window, Groups, GroupNamePersist, Message) {

  $ionicModal.fromTemplateUrl('templates/sendMessage.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modalMessage = modal;
  });

  $scope.getGroup = function() {
    return GroupNamePersist.getGroupName();
  };

  $scope.sendMessage = function() {
    var data = {
      messageData: $scope.messageData,
      groupName: $scope.groupName
    };
    Message.sendMessage(data)
    .then(function() {
    $timeout(function() {
      $scope.closeLogin();
    }, 500);
    });
  };

  $scope.openMessage = function() {
    $scope.modalMessage.show();
  };

  $scope.closeMessage = function() {
    $scope.modalMessage.hide();
  };

  $scope.getUsers = function(groupName) {
    console.log('first step: ' + groupName);
    Groups.getUsers(groupName)
      .then(function(data) {
        console.dir('getUsers data: ' + data);
        $scope.users = data;
      });
  };

  $scope.users = $scope.getUsers($scope.getGroup());
  $scope.groupName = $scope.getGroup();

    // TODO: leave group
  $scope.leaveGroup = function(groupName) {
    var phone = $window.localStorage.getItem('phone');
    var data = {
      phone: phone,
      groupName: groupName
    };

    Groups.leaveGroup(data);
  };
})

.controller('GroupsController', function($scope, $window, $location, Groups, GroupNamePersist, $state) {
  //hold data here after quering db
  $scope.data = {
    groups: Groups.data,
    users: [],
    usergroups : []
  };

  $scope.addGroup = function(groupName) {
    console.log(groupName);
    GroupNamePersist.setGroupName(groupName);
  };

  $scope.groupDetail = function(groupName) {
    $scope.addGroup(groupName);
    $state.go('app.mygroupdetails');
  };

  $scope.joinGroup = function(group) {
    var phone = $window.localStorage.getItem('phone');
    console.log('full group object' + group);
    var name = group;
    var data = {
      phone: phone, 
      name: name
    };
    console.log(data.phone +' joined the group: ' + group);

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
    });
  };

  $scope.createGroup = function() {
    console.log($scope.data.newGroup);
    var name = $scope.data.newGroup;
    var phone = $window.localStorage.getItem('phone');
    var data = {
      phone: phone, 
      name: name
    };

    Groups.createGroup(data)
      .then(function() {
        $location.path('/groups');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.pingGroup = function(groupName) {
    //only the username is need to ping the group
    var name = groupName.name;
    var phone = $window.localStorage.getItem('phone');
    console.log('pingGroup: ' + phone);
    var data = {
      phone: phone,
      name: name
    };
    
    Groups.pingGroup(data)
      .then(function() {
        $location.path('/groups');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  //fetches all the groups a user is a member of
  $scope.userGroups = function() {
    console.log('user group refresh');
    var phone = $window.localStorage.getItem('phone');

    Groups.userGroups(phone)
      .then(function(data) {
        // console.log(data);
        $scope.data.usergroups = data;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  $scope.getGroups();
  $scope.userGroups();

});