// initiate dotenv
require("dotenv").config();
// load axios
let axios = require("axios");

//======================= Start concert-this ============================
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



// Call concertThis()function 
if (process.argv[2] === "concert-this") {
    concertThis();
};
//=================== End concert-this ===========================


//=================== spotify-this-song ==========================
// declare new spotify object with client id and client secret
// load the keys.js
let keys = require("./keys.js");

// Not sure if below is needed?????? 
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

// console.log(`~~~~~Spotify:  ${spotify.credentials.id} ~~~~~~~~`)
// console.log(Object.keys(spotify))
// console.log(Object.values(spotify))

function spotifyThisSong() {
    let query = "";
    for (let i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            query = query + " " + process.argv[i];
            console.log(query);
        } else {
            query += process.argv[i];
        }
    }
    getSongInfo(query); //==> uncomment this once this function is completed.
}

// Need to make query to spotify api to get the song information.
function getSongInfo(search) {

    spotify.search({
        type: 'track',
        query: search, // need to put query here. 
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err); // what about this return?
        }

        let responseItem = data.tracks.items[0];
        let artists = responseItem.artists[0].name;
        let name = responseItem.name;
        let previewLink = responseItem.preview_url;
        let album = responseItem.album.name;
        console.log(
            " Artists:\n", artists,
            "\n Name:\n", name,
            "\n Preview Link:\n", previewLink,
            "\n Album:\n", album,
        )

    });

}
// Call spotifyThisSong()function 
if (process.argv[2] === "spotify-this-song") {
    spotifyThisSong()
};

//=================== End spotify-this-song ==========================



//=================== movie-this =====================================
//http://www.omdbapi.com/?t=titanic&apikey=afa1311b

//console.log('OMDB key:', keys.omdb.key)
let omdbKey = keys.omdb.key;

function movieThis() {
    let title = "";
    for (let i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            title = title + "+" + process.argv[i];
            //console.log(title);
        } else {
            title += process.argv[i];
        }
    }
    getMovieInfo(title); //==> uncomment this once this function is completed.
}

function getMovieInfo(movieName) { //moviename as title in api
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbKey).then(
        function (response) {
            let movieInfo = response.data;
            //console.log needed information
            console.log("Title: ", movieInfo.Title);
            console.log("Year: ", movieInfo.Year);
            console.log("IMDB Rating: ", movieInfo.imdbRating);
            // only shoe Rotton Tomatoes Rating if it exist
            for (i = 0; i < movieInfo.Ratings.length; i++) {
                if (movieInfo.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating: ", movieInfo.Ratings[1].Value);
                }
            }
            console.log("Country: ", movieInfo.Country);
            console.log("Language: ", movieInfo.Language);
            console.log("Plot: ", movieInfo.Plot);
            console.log("Actors: ", movieInfo.Actors);
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
// Call movieThis()function 
// If user didn't put in a movie name, display Mr. Nobody by default.
if (process.argv[2] === "movie-this" && process.argv.length === 3) {
    let setMovie = "Mr.+Nobody";
    getMovieInfo(setMovie);
} else {
    movieThis();
};

//=================== End movie-this =====================================


// movie-this
// do-what-it-says 
// node liri.js spotify-this-song '<song name here>'