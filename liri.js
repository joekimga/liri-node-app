var fs = require("fs");
var request = require("request");
var Twitter = require("Twitter");
var Spotify = require("Spotify");
var keys = require("keys");

var newTwit = new Twitter(keys);

//Twitter 

var parameters = {
	"screen_name": "gtburneraddy",
	"count": 20
}

if (arg === "tweets") {
	newTwit.get('', parameters,
	function gotData(error, data, response) {
		var tweets = data;
		for(var i =0;i < tweets.lengthl; i++) {
			console.log(tweets[i].text);
			console.log(tweets[i].created_at);
		}
	});
	outputText();
}

//OMDB

if(arg === )