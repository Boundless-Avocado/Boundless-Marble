angular.module('boundless.services', [])

	//services to fetch & make groups
.factory('Groups', function($http) {

	var getGroups = function() {
		return $http({
			method: 'GET',
			url: '/api/groups/'
		})
		.then(function (resp) {
			return resp.data;
		});
	};

	var createGroup = function(data) {
		console.log(data.phone + ' created the group: ' + data.name);
		return $http({
			method: 'POST',
			url: '/api/groups/',
			data: data
		})
		.then(function(resp) {
			return resp.data;
		});
	};
		//new entry should added to the memberships join table. 
		// 'data' is an object containing the groups information
	var joinGroup = function(data) {
		// console.log('Joined: ' + data.groupName);
		console.log(data.phone +' joined the group: ' + data.name);
		return $http({
			method: 'POST',
			url: '/api/groups/' + data.name + '/',
			data: data
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	var pingGroup = function(data) {
		console.log(data.phone + ' pinged the group: ' + data.name);
		return $http({
			method: 'POST',
			url: '/api/groups/' + data.name + '/pings/',
			data: {phone: data.phone}
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	var getUsers = function(data) {
		console.log(data.name);
		return $http({
				method: 'GET',
				url: '/api/groups/' + data.name + '/',
				data: data
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	var userGroups = function(phone) {
		return $http({
			method: 'GET',
			url: '/api/users/' + phone + '/groups',
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	return {
		getGroups: getGroups,
		createGroup: createGroup,
		joinGroup: joinGroup,
		pingGroup: pingGroup,
		getUsers: getUsers,
		userGroups: userGroups
	};
})

.factory('Auth', function($http, $location, $window, $state){ 
		//Authorization is currently storing username in local storage
	var signin = function(user) {
		console.log(user);
		return $http({
				method: 'POST',
				url: '/api/users/signin',
				data: user
		})
		.then(function(resp) {
			if (resp) {
				$window.localStorage.setItem('token', resp.data.token);
				$state.go('app.mygroups');
			}
		});
	};

		//this should query server for a confirmation code
	var signup = function(user) {
		return $http({
			method: 'POST',
			url: '/api/users/signup',
			data: user
		})
		.then(function(resp) {
			if (resp) {
				$window.localStorage.setItem('token', resp.data.token);
				$state.go('app.mygroups');
			}
		});
	};

	var signout = function() {
		$window.localStorage.removeItem('phone');
		$location.path('/');
	};
		//checks token to check if user's session is still valid
	var isAuth = function() {
		return !!$window.localStorage.getItem('phone');
	};

	return {
		signin: signin,
		signup: signup,
		isAuth: isAuth,
		signout: signout,
	};
})

.factory('AttachTokens', function($window){ 
	console.log('attaching!');
		//Authorization is currently storing username in local storage
	var attach = {

		request: function(object) {
			var jwt = $window.localStorage.getItem('token');
			console.log(jwt);
			if (jwt) {
				object.headers['x-access-token'] = jwt;
			}
			object.headers['Allow-Control-Allow-Origin'] = '*';
			return object;
		}
	};

	return attach;
});