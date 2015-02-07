angular.module('boundless.groups', [])

.controller('GroupsController', function($scope, $window, $location, $http, Groups, GroupNamePersist, $state) {
  //hold data here after quering db
  $scope.data = {
    groups: Groups.data,
    users: [],
    usergroups: []
  };

  $scope.addGroup = function(groupName) {
    console.log(groupName);
    GroupNamePersist.setGroupName(groupName);
  };

  $scope.groupDetail = function(groupName) {
    $scope.addGroup(groupName);
    $state.go('app.mygroupdetails');
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
    });
  };

  $scope.createGroup = function() {
    console.log($scope.data.newGroup);
    
    var data = {
      phone:  $window.localStorage.getItem('phone'),
      name: $scope.data.newGroup,
      latitude: $scope.data.latitude,
      longitude: $scope.data.longitude,
      physicalAddress: $scope.data.physicalAddress,
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
    console.log('groups.js');
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

  $scope.getGroups();
  $scope.userGroups();
})

.controller('MyGroupDetailsController', function($scope, $ionicModal, $timeout, $window, Groups, GroupNamePersist, Message) {

  $scope.messageData = ''; 

  $ionicModal.fromTemplateUrl('templates/sendMessage.html', {
    scope: $scope
  })
  .then(function(modal) {
    $scope.modalMessage = modal;
  });

  $scope.getGroup = function() {
    return GroupNamePersist.getGroupName();
  };

  $scope.sendMessage = function(messageData) {
    var data = {
      Body: messageData,
      groupName: $scope.groupName,
      phone: $window.localStorage.getItem('phone')
    };
    console.log(data.Body);

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
        $scope.users.count = data.length;
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


  $scope.users = $scope.getUsers($scope.getGroup());
  $scope.groupName = $scope.getGroup();
});

