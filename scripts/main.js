"use strict";var twitchy=angular.module("twitchy",[]);twitchy.service("streams",["$http",function(t){var a=this;a.get=function(a){return t.get(a)}}]),twitchy.controller("mainCtrl",["streams",function(t){var a=this,e=["ESL_SC2","OgamingSC2","cretetion","freecodecamp","storbeck","habathcx","RobotCaleb","noobs2ninjas","mightymouseufc125"];a.allStreams=[],a.filterStreams=function(){a.streams=a.allStreams.filter(function(t){return"ALL"===a.status?t:"ONLINE"===a.status?t.data.stream:"OFFLINE"===a.status?!t.data.stream:void 0})},a.status="ALL",e.forEach(function(e){var s="https://wind-bow.gomix.me/twitch-api/streams/"+e;t.get(s).then(function(t){a.allStreams.push({name:e,data:t.data})}).then(function(){a.filterStreams()})})}]);