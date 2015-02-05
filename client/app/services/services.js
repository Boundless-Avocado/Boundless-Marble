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

	var pingGroup = function(phone) {
		console.log(data.phone + ' pinged the group: ' + data.name);
		return $http({
			method: 'POST',
			url: '/api/groups/' + phone+ '/pings/',
			data: {phone: phone}
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
			url: '/api/users/' + phone + '/groups'
		})
		.then(function(resp) {
			console.log("AAAAH");
			console.dir(resp)
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

.factory('Auth', function($http, $location, $window){ 
		//Authorization is currently storing username in local storage
	var signin = function(user) {
		return $http({
				method: 'POST',
				url: '/api/users/signin',
				data: user
		})
		.then(function(resp) {
			console.log("GUACCCCC");
			console.dir(resp);
			return resp.data;
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
			console.log('goodbye');
			return resp.data.token;
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
		confirm : confirm
	};
});















