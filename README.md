# LIRI-Bot


LIRI-Bot is short for Interpretation and Recognition Interface, what it does is to take in different commands from the user input and display the proper information according to the commands.

This app has a main js file liri.js which covers four functions which takes in four different commands - "concert-this","spotify-this-song","movie-this","do-what-it-says".

concert-this takes in an input of an artist and displays the most recent event for this artist.

spotify-this-song takes in an input of a song name and displays information about this song, also provide a link to the song for playing.

movie-this takes in an input of movie name and provides related information about the movie.

The above three functions basically require information from their own api.

do-what-it-says function takes in the text in the random.txt file, and execute the command written there.

In order to run the app on your own laptop, you would need your own .env file and save your key information in your local folder in the below format:

Spotify API keys
SPOTIFY_ID=your SPOTIFY_ID
SPOTIFY_SECRET=your SPOTIFY_SECRET

OMDB API key
OMDB_KEY=your OMDB_KEY

To run the app, please check out the below video, basically you need to specify the command and the input to retrieve information.

https://www.youtube.com/watch?v=RsPTkIU5oJo

You can also log the output into the log.txt file.

Technologies used in the app

npm,axios,inquire,fs,

js
