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

// Spotify 
if(argument === "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log(data[i].name);
                console.log(data[i].album.href);
                console.log(data[i].album.name);
                console.log(data[i].preview_url);
            
                for(var j =0; j < data[i].artists.length; j++){
                    console.log(data[i].artists[j].name);
                }
            }
        }else{
            spotify.search({ type: 'track', query: "The Sign"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); 
                console.log(data[0].album.href); 
                console.log(data[0].album.name); 
                console.log(data[0].preview_url); 
                console.log(data[0].artists[0].name); 
            });
        }
    });
    outputText();
}

//OMDB 
if(argument === "movie-this"){ 
    console.log(process.argv);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true",function (error, response, body){
        
        if(process.argv[3]){
        console.log(body);  
       
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true",function(error, response,body){
                console.log(body);
            
            })
        }
    })
    // outputText();
}

// Spotify Logic
if(argument === "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log(data[i].name); 
                console.log(data[i].album.href); 
                console.log(data[i].album.name); 
                console.log(data[i].preview_url); 
            
                for(var j =0; j < data[i].artists.length; j++){
                    console.log(data[i].artists[j].name); 
                }
            }
        }else{
            spotify.search({ type: 'track', query: "I Want it That Way"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); 
                console.log(data[0].album.href); 
                console.log(data[0].album.name); 
                console.log(data[0].preview_url); 
                console.log(data[0].artists[0].name); 
            });
        }
    });
    outputText();
}