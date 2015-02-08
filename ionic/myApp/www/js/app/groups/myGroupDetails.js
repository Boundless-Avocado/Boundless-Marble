angular.module('boundless.groupDetails', [])

.controller('MyGroupDetailsController', function($scope, $ionicModal, $state, $timeout, $window, Groups, GroupNamePersist, Message) {

  $scope.data = {
    messageData: ''
  };

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
      Body: $scope.data.messageData,
      groupName: $scope.groupName,
      phone: $window.localStorage.getItem('phone')
    };

    Message.sendMessage(data)
    .then(function() {
      $timeout(function() {
        $scope.closeMessage();
      }, 250);
      $timeout(function() {
        $scope.data.messageData = '';
      }, 400);
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

  $scope.leaveGroup = function(groupName) {
    var phone = $window.localStorage.getItem('phone');
    var data = {
      phone: phone,
      groupName: groupName
    };
    Groups.leaveGroup(data)
      .then(function(resp) {
        if (resp) {
          $scope.$emit('leaveGroup');
          $state.go('app.mygroups');
        }
      });
  };

  $scope.users = $scope.getUsers($scope.getGroup());
  $scope.groupName = $scope.getGroup();
});