// Angular Module
let twitchy = angular.module('twitchy', []);

// Service for API calls
twitchy.service('streams', ['$http', function($http) {
	const self = this;

	self.get = function(url) {
		return $http.get(url);
	};
}]);

// Main Controller
twitchy.controller('mainCtrl', ['streams', function(streams) {
	const self = this,
		  streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'mightymouseufc125'];
	self.allStreams = [];

	self.filterStreams = function() {
		self.streams = self.allStreams.filter(stream => {
			if (self.status === 'ALL') {
				return stream;
			} else if (self.status === 'ONLINE') {
				return stream.data.stream;
			} else if (self.status === 'OFFLINE') {
				return !stream.data.stream;
			}
		});
	};

	self.status = 'ALL';

	streamers.forEach(function(streamer) {
		const URL = 'https://wind-bow.gomix.me/twitch-api/streams/' + streamer;

		streams.get(URL).then(function(response) {
			self.allStreams.push({
				name: streamer,
				data: response.data
			});
		}).then(function() {
			self.filterStreams();
		});
	});
}]);