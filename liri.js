//import { log } from "util";

//requirements 
var fs = require("fs");
var spotify = require("node-spotify-api");
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

      query += liriArguments[i] + ' ';

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
    case 'do-what-it-says': doWhatItSays();
        console.log("following instructions");
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
            // console.log(tweets.tweet);
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    datecreated: tweets[i].created_at,
                    Tweets : tweets[i].text
                })
            }
            console.log(data);
            fs.appendFile('log.txt', + data, function (err) {
                if (err) {
                    console.log(err);
                }
            });
    
        }
        else {
            console.log("Error, " + error);
            fs.appendFile('log.txt', + liriArguments + error, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
//Call Spotify API

// ex: node liri.js spotify-this-song '<song name here>'
function findSongInfo() {
    var spotify = spotify(keys.spotifyKeys);
    var song = '';
    if (query === '') {
        song = 'The Sign';
    } else {
        song = query;
    }
    spotify.search({ type: 'track', query: song}, function (err, data) {
        console.log(data)
        if (err) {
            console.log('Error occurred: ' + err);
            fs.appendFile('log.txt', + liriArguments + err, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            return;
        } else {
            fs.appendFile('log.txt', + liriArguments + data, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            var result = "Name of the song: " + data.name +'\n' + "Artist: " + data.artists;
            console.log(result)
        }

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
            var result = JSON.parse(body)
            console.log(result);
            fs.appendFile('log.txt', + liriArguments + result, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            console.log("Error : " + error);
            fs.appendFile('log.txt', + liriArguments + error, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

//Do what the read file says 

function doWhatItSays() {
    fs.readFile('random.txt','utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var dataArray = data.split(',');
        dataArray[0] = command;
        console.log(dataArray)
    });
}