//requirements 
var fs = require("fs");
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");

// Calling Keys
var twitterKeys = require("./keys.js");
var spotifykeys = require("./keys.js");
//Extra Stuff

var inquirer = require("inquirer");
var geocoder = require("geocoder");

//Call keys.js
var twitterKeys = require("./keys.js");

// The input after node liri.js 

var command = process.argv[2];
var query = process.argv[3];
//Call Twitter API
if (command === "my-tweets") {
    console.log("here are my tweets");
} else if (command === "spotify-this-song") {
    console.log("here is this song");
} else if (command === "movie-this") {
    console.log("looking up the movie");
}


// switch (command) {
//     case 'my-tweets':
//         console.log("here are my tweets");
//         break;
//     case 'spotify-this-song':
//         console.log("here is this song");
//         break;
//     case 'movie-this':
//         console.log("looking up the movie");
//         break;
//     default:
//         console.log("I don't understand that, please try again");
// }
// ex: node liri.js my-tweets should call up tweets

//Call Spotify API

// ex: node liri.js spotify-this-song '<song name here>'

//Call a Movie API

// ex: node liri.js movie-this '<movie name here>'