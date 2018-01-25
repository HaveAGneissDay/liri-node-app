//import { log } from "util";

//requirements 
var fs = require("fs");
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");

//Extra Stuff

var inquirer = require("inquirer");
var geocoder = require("geocoder");

//Call keys.js
var keys = require("./keys.js");
//console.log('keys', keys);

// The input after node liri.js 

var liriArguments = process.argv;

var command = liriArguments[2];

var query = '';

for (var i = 3; i < liriArguments.length; i++) {
    if( i > 3 && i < liriArguments.length) {
    query = query + '+' + liriArguments[i];
  } else {
      query += liriArguments[i];
  }
}

// if (command === "my-tweets") {
//     console.log("here are my tweets");
// } else if (command === "spotify-this-song") {
//     console.log("here is this song");
// } else if (command === "movie-this") {
//     console.log("looking up the movie");
// }


switch (command) {
    case 'my-tweets': myTweets();
        // console.log("here are my tweets");
        break;
    case 'spotify-this-song': findSongInfo();
        console.log("here is this song");
        break;
    case 'movie-this': findMovieInfo();
        console.log("looking up the movie");
        break;
    default:
        console.log("I don't understand that, please try again");
}

//Call Twitter API

// ex: node liri.js my-tweets should call up tweets
function myTweets() {
    var client = new twitter(keys.twitterKeys);
    var params = { screen_name: 'JohnsmithHole' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        console.log(tweets)
        if (!error) {
            var data = [];
            console.log(tweets.tweet);
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'date created': tweets[i].created_at,
                    'Tweets' : tweets[i].text
                })
            }
            console.log(data);
        }
        else {
            console.log("Error, " + data);
        }
    });
}
//Call Spotify API

// ex: node liri.js spotify-this-song '<song name here>'
function findSongInfo() {
    var song = '';
    if (query === '') {
        song = 'The Sign Ace of Base';
    } else {
        song = query;
    }
    spotify.search({ type: 'track', query: song}, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
         console.log(data.name + data.artists[0].name)
    });
}
//Call a Movie API

// ex: node liri.js movie-this '<movie name here>'
function findMovieInfo() {
    var movieName = '';
    if (query === '') {
        movieName = 'Mr. Nobody';
    } else {
        movieName =  query;
    }
    console.log(movieName)
 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body));
        }
    });
}