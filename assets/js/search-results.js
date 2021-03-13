function getMovie(movieInput, key){
var moviesSearchUrl = "http://www.omdbapi.com/?t=" + movieInput + "&apikey=" + key;

fetch(moviesSearchUrl)
.then(function(response){
return response.json();
})
.then(function(data){
console.log(data);
$("#movieName").text(data.Title);
$("#plot").text("Plot" + data.Plot);
$("#year").text("Year: " + data.Year);
$("#released").text("Released: " + data.Released);
$("#runtime").text("Runtime: " + data.Runtime);
$("#genre").text("Genre: " + data.Genre);
$("#director").text("Director: " + data.Director);
$("#writer").text("Writer: " + data.Writer);
$("#actors").text("Actors: " + data.Actors);
$("#ratings").text("Ratings: " + data.Ratings[0].Value);
$("#metascore").text("MetaScore: " + data.Metascore);
$("#imbdRating").text("ImdbRating: " + data.imdbRating);
})

}

function cryptedKey(secretKey){
var bytes = CryptoJS.AES.decrypt("U2FsdGVkX185EMu/4RkVSdKjLB75UMPK31aZg517WYk=", secretKey.toString());
plaintext = bytes.toString(CryptoJS.enc.Utf8);
return plaintext;
}

// The init() function fires when the page is loaded
function init() {
// This is coming from the URL search bar in the browser. It is what comes after the `?`.
var queryString = document.location.search;
var movieName = queryString.split('=')[1];
var movie = movieName.split('?')[0];
var secretkey = queryString.split('=')[2];
console.log(secretkey);
// When the init function is executed, the code inside renderLastGrade function will also execute
var key = cryptedKey(secretkey);
getMovie(movie, key);
}
init();