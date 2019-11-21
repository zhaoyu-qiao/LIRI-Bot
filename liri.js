// initiate dotenv
require("dotenv").config();
// load the keys.js
let keys = require("./keys.js");
console.log(keys);
// load axios
let axios = require("axios");

//======================= concert-this ============================
let artist = "";

function concertThis() {
    for (let i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            artist = artist + "+" + process.argv[i]; // This is wrong
            console.log(artist);
        } else {
            artist += process.argv[i];
            //console.log(artist);
        }

    }
    getConcertInfo();
};
// use slice(), every index after [2] will be the artist name.
// use axios.get to collect information of the concert
function getConcertInfo() {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            let concertInfo = response.data[0];
            console.log("Venue name: ", concertInfo.venue.name);
            console.log("Countrt: ", concertInfo.venue.country);
            console.log("City: ", concertInfo.venue.city);
            console.log("Date", concertInfo.datetime);

        }).
    // handle errors
    catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}


// handle error
// else, display (console.log()) the information based on user input in process.argv[2] and process.argv[3]  


// Call concertThis()function 
if (process.argv[2] === "concert-this") {
    concertThis();
};

//=================== spotify-this-song ==========================
// declare new spotify object with client id and client secret
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
console.log(spotify);








// movie-this
// do-what-it-says 
// node liri.js spotify-this-song '<song name here>'