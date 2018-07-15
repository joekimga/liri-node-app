var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

var newTwit = new Twitter(keys);

//Spotify API info
var spotify = new Spotify({
    id: "830d6c71da9a44fa838ae769ab1b3ea0",
    secret: "52f29ca00b6d40628ad853df6a40fb4a"
});

//Twitter 
var getMyTweets = function() {
  var client = new Twitter(keys);

  var params = {
    screen_name: "joe"
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
// var parameters = {
// 	"screen_name": "gtburneraddy",
// 	"count": 20
// }

// if (arg === "tweets") {
// 	newTwit.get('', parameters,
// 	function gotData(error, data, response) {
// 		var tweets = data;
// 		for(var i =0;i < tweets.lengthl; i++) {
// 			console.log(tweets[i].text);
// 			console.log(tweets[i].created_at);
// 		}
// 	});
// 	outputText();
// }

// Spotify 
var getArtistNames = function(artist) {
  return artist.name;
};

var getMeSpotify = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};
// if(argument === "spotify-this-song"){
//     var songTitle = process.argv[3];
//     spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
//         if(process.argv[3]){
//             var data = data.tracks.items;
//             for(var i =0; i < data.length; i++){
                
//                 console.log(data[i].name);
//                 console.log(data[i].album.href);
//                 console.log(data[i].album.name);
//                 console.log(data[i].preview_url);
            
//                 for(var j =0; j < data[i].artists.length; j++){
//                     console.log(data[i].artists[j].name);
//                 }
//             }
//         }else{
//             spotify.search({ type: 'track', query: "The Sign"}, function(err, data){
//                 var data = data.tracks.items;
//                 console.log(data[0].name); 
//                 console.log(data[0].album.href); 
//                 console.log(data[0].album.name); 
//                 console.log(data[0].preview_url); 
//                 console.log(data[0].artists[0].name); 
//             });
//         }
//     });
//     outputText();
// }

//OMDB 
var getMeMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};
// if(argument === "movie-this"){ 
//     console.log(process.argv);
//     var movieTitle = process.argv[3];
//     request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true",function (error, response, body){
        
//         if(process.argv[3]){
//         console.log(body);  
       
//         }else{
//             request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true",function(error, response,body){
//                 console.log(body);
            
//             })
//         }
//     })
//     // outputText();
// }

// Spotify Logic
// if(argument === "spotify-this-song"){
//     var songTitle = process.argv[3];
//     spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
//         if(process.argv[3]){
//             var data = data.tracks.items;
//             for(var i =0; i < data.length; i++){
                
//                 console.log(data[i].name); 
//                 console.log(data[i].album.href); 
//                 console.log(data[i].album.name); 
//                 console.log(data[i].preview_url); 
            
//                 for(var j =0; j < data[i].artists.length; j++){
//                     console.log(data[i].artists[j].name); 
//                 }
//             }
//         }else{
//             spotify.search({ type: 'track', query: "I Want it That Way"}, function(err, data){
//                 var data = data.tracks.items;
//                 console.log(data[0].name); 
//                 console.log(data[0].album.href); 
//                 console.log(data[0].album.name); 
//                 console.log(data[0].preview_url); 
//                 console.log(data[0].artists[0].name); 
//             });
//         }
//     });
//     outputText();
// }

//do-what-it-says
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
